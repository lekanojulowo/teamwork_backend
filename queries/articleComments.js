// Configuration files

const db = require("../config");
const tableC= 'article_comments';
const jwt = require('jsonwebtoken');

// add query functions

  // POST: Create Article Comment
  const createArticleComment = (req, res, next) => {    
    jwt.verify(req.token, '12345secret67890', (err, authData) => {
      if(err){
        res.status(403)
        .json({
        "status": "error",
        "error": "Forbidden: Unauthorize Access"
      })
      }
      const {comment, article, articleTitle} = req.body;
      const articleId = parseInt(req.params.id)
      const values = [authData.userid, articleId, comment]
      db.one(`insert into ${tableC}(userid, articleid, comment) values($1, $2, $3) returning createdon`, [...values])
      .then((data) => {        
        res.status(200)
          .json({
            status: 'success',
            data: {
              message: 'Comment successfully created',              
              createdOn: data.createdon,
              articleTitle,
              article,
              comment
            }
          });
      })
      .catch((err) => {
        return next(err);
      });
    });    
  }
 
  // PATCH flag an article
  const flagArticleComment = (req, res, next) => {
    const {title, article} = req.body;
    db.none(`update ${tableC} set appropriate=$1 where commentid=$2`, [false, parseInt(req.params.commentid)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'Comment successfully flagged as inappropriate',
            title,
            article
          }
        });
      })
      .catch((err) => {
        return next(err);
      });
    }
    
    // DELETE delete Article
    const deleteArticleComment = (req, res, next) => {
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
            message: `Comment successfully deleted`
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
  createArticleComment,
  flagArticleComment,
  deleteArticleComment
};

