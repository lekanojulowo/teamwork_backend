// Configuration files

const db = require("../config");
const tableA= 'articles';
const tableC= 'article_comments';
const jwt = require('jsonwebtoken');

// add query functions


// Get fetch all articles
const getAllArticles = (req, res, next) => {
  db.any(`select * from ${tableA} order by createdon desc`)
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

// Get  fetch single article
  const getSingleArticle = (req, res, next) => {
    const articleId = parseInt(req.params.id);
    db.one(`select articleid id, createdon, title, article, category from ${tableA} where articleid = $1`, articleId)
      .then((data) => { 
        const {id, createdon, title, article, category}   = data
        db.any(`select commentid, comment, userid authorid from ${tableC} where articleid = $1 order by createdon desc`, articleId)
        .then((comments) => { 
        res.status(200)
            .json({
              status: 'success',
              data: {
                id,
                createdon,
                title,
                article,
                category,
                comments
              }            
            });
        })
      .catch((err) => {
        return next(err);
      });
        })
      .catch((err) => {
        return next(err);
      });
  }

  // Get  fetch article by category
  const getCategoryArticle = (req, res, next) => {
    const {category} = req.params;
    db.any(`select articleid, userid authorid, title, article, category, appropriate, createdon from ${tableA} where category = $1`, category)
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

  // POST: Create Articles
  const createArticle = (req, res, next) => {    
    jwt.verify(req.token, '12345secret67890', (err, authData) => {
      if(err){
        res.status(403)
        .json({
        "status": "error",
        "error": "Forbidden: Unauthorize Access"
      })
      }
      const {title, article, category} = req.body;
      const values = [authData.userid, title, article, category]
      db.one(`insert into ${tableA}(userid, title, article, category) values($1, $2, $3, $4) returning articleid, createdon`, [...values])
      .then((data) => {        
        res.status(200)
          .json({
            status: 'success',
            data: {
              message: 'Article successfully posted',              
              articleId: data.articleid,
              createdOn: data.createdon
            }
          });
      })
      .catch((err) => {
        return next(err);
      });
    });    
  }
  
  // PATCH Edit an article
  const updateArticle = (req, res, next) => {
    const {title, article} = req.body;
    db.none(`update ${tableA} set title=$1, article=$2 where articleid=$3`,
    [title, article, parseInt(req.params.id)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'Article successfully updated',
            title,
            article
          }
        });
      })
      .catch((err) => {
        return next(err);
      });
    }
  
  // PATCH flag an article
  const flagArticle = (req, res, next) => {  
    const {title, article} = req.body; 
    db.none(`update ${tableA} set appropriate=$1 where articleid=$2`,
    [false, parseInt(req.params.id)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'Article successfully flagged as inappropriate',
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
    const deleteArticle = (req, res, next) => {
      //db.result(`delete from ${tableA} where articleid = $1`, parseInt(req.params.id))
      jwt.verify(req.token, '12345secret67890', (err, authData) => {    
        if(err || !authData.admin){
          return res.status(403)
            .json({
            "status": "error",
            "error": "Forbidden: Unauthorize Access"
          })
        }
      db.none(`delete from ${tableA} where articleid = $1 and appropriate=$2`, [parseInt(req.params.id), false])
      .then(() => {
        /* jshint ignore:start */
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: `Article successfully deleted`
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
  getAllArticles,
  getSingleArticle,
  getCategoryArticle,
  createArticle,
  updateArticle,
  flagArticle,
  deleteArticle
};

