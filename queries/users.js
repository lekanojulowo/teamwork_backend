// Configuration files

const db = require("../config");
const table= 'users';
const jwt = require('jsonwebtoken');

// add query functions

// Get fetch all users
const getAllUsers = (req, res, next) => {
  db.any(`select * from ${table}`)
    .then((data) => {
      res.status(200)
        .json({
            status: 'success',
            data
          });
      })
      .catch((err) => {
        return next(err);
      });
  }

// Get  fetch single user
  const getSingleUser = (req, res, next) => {
    var userId = parseInt(req.params.id);
    db.one(`select * from ${table} where userid = $1`, userId)
      .then((data) => {        
        res.status(200)
          .json({
            status: 'success',
            data
          });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // POST: Create user
const createUser = (req, res, next) => { 
  jwt.verify(req.token, '12345secret67890', (err, authData) => {    
    if(err || !authData.admin){
      return res.status(403)
        .json({
        "status": "error",
        "error": "Forbidden: Unauthorize Access"
      })
    }
   
    const {firstname, lastname, email, password, gender, jobrole, department, address} = req.body;
    const values = [firstname, lastname, email, password, gender, jobrole, department, address];
    db.one(`insert into ${table}(firstname, lastname, email, password, gender, jobrole, department, address) values($1, $2, $3, $4, $5, $6, $7, $8) returning userid`, [...values])  
      .then((data) => {
        const {userid} = data;
        jwt.sign({userid, firstname, lastname }, '12345secret67890', {expiresIn: 24 * 60 * 60}, (err, usertoken) => {         
        
          res.status(200)
          .json({
            status: 'success',
            data: {
              message: 'User account successfully created',
              token: usertoken,
              userId: userid
            }

          });
      })
    })
      .catch((err) => {
        return next(err);
      }); 
    });  
}
  
  // POST: Login user
  const loginUser = (req, res, next) => {  
    db.one(`select * from ${table} where email=$/email/ and password=$/password/`, req.body)  
      .then((data) => {
        const {firstname, lastname, userid, admin} = data;

        jwt.sign({ userid, firstname, lastname, admin }, '12345secret67890', {expiresIn: 24 * 60 * 60}, (err, usertoken) => {         
        
          res.status(200)
          .json({
            status: 'success',
            data: {
              token: usertoken,
              userId: userid
            }
          });
      })
    })
      .catch((err) => {
        return next(err);
      });
  }
  
    
    
    
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  loginUser
};

