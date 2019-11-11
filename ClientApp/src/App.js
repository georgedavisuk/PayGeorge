import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PayForm from "./components/PayForm";
import Callback from "./components/Callback";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route
          exact={true}
          path="/"
          render={() => (
            <div className="App">
              <PayForm />
            </div>
          )}
        />
        <Route
          path="/callback"
          render={() => (
            <div className="App">
              <Callback />
            </div>
          )}
        />
      </div>
    </BrowserRouter>
    // <div className="App">
    //   <div>
    //     <h1>Pay George</h1>
    //     <PayForm></PayForm>
    //   </div>
    // </div>
  );
}

export default App;
