// Configuration files
const jwt = require('jsonwebtoken');
const db = require("../config");
const tableC = "gif_comments";

// query functions

  // POST: Create gif
  const createGifComment = (req, res, next) => {
    jwt.verify(req.token, '12345secret67890', (err, authData) => {
      if(err){
        res.status(403)
        .json({
        "status": "error",
        "error": "Forbidden: Unauthorize Access"
      })
      }

    const {gifTitle, comment} = req.body;
    const gifid = parseInt(req.params.id);
    const values = [authData.userid, gifid, comment];
    db.one(`insert into ${tableC}(userid, gifid, comment) values($1, $2, $3) returning createdon`, [...values])
      .then((data) => { 
        res.status(200)
          .json({
            status: 'success',
            data: {                         
              message: 'comment successfully created',
              createdOn: data.createdon,
              gifTitle,
              comment 
            }
          });
      });
  });
}
  
  // PATCH flag gif
  const flagGifComment = (req, res, next) => {
    db.none(`update ${tableC} set appropriate=$1 where commentid=$2`,
    [false, parseInt(req.params.commentid)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'comment successfully flagged as inappropriate' 
          }         
        });
      })
      .catch((err) => {
        return next(err);
      });
    }
    
    // DELETE delete gif
    const deleteGifComment = (req, res, next) => {
      jwt.verify(req.token, '12345secret67890', (err, authData) => {    
        if(err || !authData.admin){
          return res.status(403)
            .json({
            "status": "error",
            "error": "Forbidden: Unauthorize Access"
          })
        }
      db.none(`delete from ${tableC} where commentid = $1 and appropriate=$2`, [parseInt(req.params.commentid), false])
      .then(() => {
        /* jshint ignore:start */        
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: `comment successfully deleted`
          }         
        });
        /* jshint ignore:end */
      })
      .catch((err) => {
        return next(err);
      });
    });
  }
    
module.exports = {
  createGifComment,
  flagGifComment,
  deleteGifComment
};

