// Configuration files

const db = require("../config");
const msg = 'Welcome to Teamwork API';

// add query functions

// GET index Display Welcome Page
function welcomeMsg(req, res) {
 res.send({msg});
  }

// GET API Welcome Page
function welcomeAPIMsg(req, res) {
  res.send({msg});
  }


    module.exports = {     
  welcomeMsg,
  welcomeAPIMsg
};

