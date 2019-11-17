// Configuration files
const jwt = require('jsonwebtoken');
const db = require("../config");
const tableA = "articles";
const tableG = "gifs";

// query functions

// Get fetch all gif
const getFeed = (req, res, next) => {
  db.any(`select a.articleid id, a.createdon createdOn, a.title, a.article articleUrl, a.userid authorId from articles a union select g.gifid id, g.createdon createdOn, g.title, g.imageurl articleUrl, g.userid authorId from gifs g order by createdOn desc`)
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

    
module.exports = {
  getFeed  
};

