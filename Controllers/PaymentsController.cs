using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PayGeorge.Controllers
{
    [Route("api/[controller]")]
    public class PaymentsController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult CreatePayment(string amount, string reference)
        {
            var client = new HttpClient();
            var token = GetToken(client);
            if (token == "could not retrieve token") return StatusCode(500, token);

            HttpResponseMessage response;

            using (var request = new HttpRequestMessage(new HttpMethod("POST"),
                "https://pay-api.truelayer.com/single-immediate-payments"))
            {
                request.Headers.TryAddWithoutValidation("Authorization", "Bearer " + token);
                var content = new CreatePaymentObject
                {
                    amount = amount,
                    currency = "GBP",
                    remitter_reference = reference,
                    beneficiary_reference = reference,
                    beneficiary_name = "George Davis",
                    beneficiary_sort_code = "608371",
                    beneficiary_account_number = "61338438",
                    redirect_uri = Environment.GetEnvironmentVariable("REDIRECT_URI")
                };

                request.Content = new StringContent(JsonConvert.SerializeObject(content));
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                response = client.SendAsync(request).Result;
            }

            return response.IsSuccessStatusCode
                ? StatusCode(200, response.Content.ReadAsStringAsync().Result)
                : StatusCode(500, "Could not create payment");
        }

        [HttpGet("[action]")]
        public IActionResult GetPaymentState(string id)
        {
            var client = new HttpClient();
            var token = GetToken(client);
            if (token == "could not retrieve token") return StatusCode(500, token);

            HttpResponseMessage response;

            using (var request = new HttpRequestMessage(new HttpMethod("GET"),
                "https://pay-api.truelayer.com/single-immediate-payments/" + id))
            {
                request.Headers.TryAddWithoutValidation("Authorization", "Bearer " + token);
                response = client.SendAsync(request).Result;
            }

            return response.IsSuccessStatusCode
                ? StatusCode(200, response.Content.ReadAsStringAsync().Result)
                : StatusCode(500, "Could not retrieve payment state");
        }

        private static string GetToken(HttpClient client)
        {
            var requestBody = new Dictionary<string, string>
            {
                {"grant_type", "client_credentials"},
                {"client_id", Environment.GetEnvironmentVariable("TRUELAYER_ID")},
                {"client_secret", Environment.GetEnvironmentVariable("TRUELAYER_SECRET")},
                {"scope", "payments"}
            };

            var content = new FormUrlEncodedContent(requestBody);

            var response = client.PostAsync("https://auth.truelayer.com/connect/token", content).Result;

            if (!response.IsSuccessStatusCode) return "could not retrieve token";
            var result = JsonConvert.DeserializeObject<AuthResponse>(response.Content.ReadAsStringAsync().Result);
            return result.access_token;
        }
    }


    public class AuthResponse
    {
        public string access_token { get; set; }
        public string expires_in { get; set; }

        public string token_type { get; set; }
    }

    public class CreatePaymentObject
    {
        public string amount { get; set; }
        public string currency { get; set; }
        public string remitter_reference { get; set; }
        public string beneficiary_name { get; set; }
        public string beneficiary_sort_code { get; set; }
        public string beneficiary_account_number { get; set; }
        public string beneficiary_reference { get; set; }
        public string redirect_uri { get; set; }
    }
}