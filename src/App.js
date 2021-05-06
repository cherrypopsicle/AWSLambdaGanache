// external pkgs
import axios from "axios";

// react pkgs
import React from "react";

function App() {
  const lambdaApiEndpoint =
    "https://amvianli8k.execute-api.us-east-1.amazonaws.com/dev/hello-world";
  axios
    .get(lambdaApiEndpoint)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  return <div className="App">Contract Deployer</div>;
}

export default App;
