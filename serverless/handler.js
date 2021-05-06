"use strict";
const ganache = require("ganache-cli");
const ganacheProvider = ganache.provider();
const Web3 = require("web3");
const web3 = new Web3(ganacheProvider);

module.exports.testFunction = async (event, context, callback) => {
  let accounts = await new web3.eth.getAccounts();
  let data = JSON.parse(event.body);
  let contract = await new web3.eth.Contract(data.abi)
    .deploy({ data: data.byteCode })
    .send({ from: accounts[0], gas: "5555555" });
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*",
    },
    body: JSON.stringify({
      message: "Contract deployed at: " + contract.options.address,
      input: event,
    }),
  };

  callback(null, response);
};
