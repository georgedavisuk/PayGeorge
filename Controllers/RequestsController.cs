using System;
using System.Xml;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Newtonsoft.Json;

namespace PayGeorge.Controllers
{
    [Route("api/[controller]")]
    public class RequestsController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult CreateRequest(string amount, string reference, string accountNumber, string sortCode, string name)
        {
            var accountSid = Environment.GetEnvironmentVariable("TWILLIO_SID");
            var authToken = Environment.GetEnvironmentVariable("TWILLIO_TOKEN");

            var paymentResult = PaymentsController.CreatePaymentOutbound(amount, reference, name, accountNumber, sortCode);
            if (paymentResult == "Could not create payment")
            {
                return StatusCode(500, paymentResult);
            }
            var paymentObject = JsonConvert.DeserializeObject<PaymentReturnObject>(paymentResult);

            TwilioClient.Init(accountSid, authToken);

            var amountDouble = Convert.ToDouble(amount) / 100;

            var message = MessageResource.Create(
                body: name + " has requested £" + amountDouble + " from you. Pay with this link:" + paymentObject.results[0].auth_uri,
                from: new Twilio.Types.PhoneNumber("+447447990785"),
                to: new Twilio.Types.PhoneNumber("+447749193293")
            );

            return StatusCode(200, "Complete");
        }
    }

    public class PaymentReturnObject
    {
        public ResultsObject[] results { get; set; }
    }

    public class ResultsObject
    {
        public string simp_id { get; set; }
        public string auth_uri { get; set; }
        public string created_at { get; set; }
        public string amount { get; set; }
        public string currency { get; set; }
        public string remitter_reference { get; set; }
        public string beneficiary_name { get; set; }
        public string beneficiary_sort_code { get; set; }
        public string beneficiary_account_number { get; set; }
        public string beneficiary_reference { get; set; }
        public string redirect_uri { get; set; }
        public string status { get; set; }
    }
}
