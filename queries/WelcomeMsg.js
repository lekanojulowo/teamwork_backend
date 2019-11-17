// Configuration files

const db = require("../config");

// add query functions

// GET index Display Welcome Page
function welcomeMsg(req, res) {
 res.send("<h1>Welcome to Teamwork</h1>")
  }

// GET API Welcome Page
function welcomeAPIMsg(req, res) {
  res.send("<h1>Welcome to Teamwork API</h1>")
  }


    module.exports = {     
  welcomeMsg,
  welcomeAPIMsg
};

