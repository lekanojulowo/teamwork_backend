const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// Require Routes
const df = require('./queries/WelcomeMsg');
const users = require('./queries/users');
const articles = require('./queries/articles');
const articleComments = require('./queries/articleComments');
const gifs = require('./queries/gifs');
const gifComments = require('./queries/gifComments');
const feed = require('./queries/feed');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(fileUpload({ useTempFiles: true }));

// Verify Token Function
function verifyToken (req, res, next) {  
  const bearerToken = req.headers['token'];
  // Check if bearerToken is undefined
  if (typeof bearerToken !== 'undefined') {
    req.token = bearerToken;
    // Call next middleware
    next();
  } else{
    res.status(403)
      .json({
      "status": "error",
      "error": "Forbidden: Unauthorize Access"
    })
  }
}

//Default Routes
app.get('/', df.welcomeMsg);
app.get('/api', verifyToken, df.welcomeAPIMsg);

// User Routes
app.get('/api/v1/employees', verifyToken, users.getAllUsers);
app.get('/api/v1/employees/:id', verifyToken, users.getSingleUser);
app.post('/api/v1/auth/create-user', verifyToken, users.createUser);
app.post('/api/v1/auth/signin', users.loginUser);

// Articles Routes
app.get('/api/v1/articles', verifyToken, articles.getAllArticles);
app.get('/api/v1/articles/:id', verifyToken, articles.getSingleArticle);
app.get('/api/v1/articles/category/:category/', verifyToken, articles.getCategoryArticle);
app.post('/api/v1/articles', verifyToken, articles.createArticle);
app.patch('/api/v1/articles/:id', verifyToken, articles.updateArticle);
app.patch('/api/v1/articles/flag/:id', verifyToken, articles.flagArticle);
app.delete('/api/v1/articles/:id', verifyToken, articles.deleteArticle);

// Article Comments Routes
app.post('/api/v1/articles/:id/comments', verifyToken, articleComments.createArticleComment);
app.patch('/api/v1/articles/:articleid/comments/flag/:commentid', verifyToken, articleComments.flagArticleComment);
app.delete('/api/v1/articles/:articleid/comments/:commentid', verifyToken, articleComments.deleteArticleComment);


// Gifs Routes
app.get('/api/v1/gifs', verifyToken, gifs.getAllGifs);
app.get('/api/v1/gifs/:id', verifyToken, gifs.getSingleGif);
app.post('/api/v1/gifs', verifyToken, gifs.createGif);
app.patch('/api/v1/gifs/:id', verifyToken, gifs.updateGif);
app.patch('/api/v1/gifs/flag/:id', verifyToken, gifs.flagGif);
app.delete('/api/v1/gifs/:id', verifyToken, gifs.deleteGif);

// Gif Comments Routes
app.post('/api/v1/gifs/:id/comments', verifyToken, gifComments.createGifComment);
app.patch('/api/v1/gifs/:gifid/comments/flag/:commentid', verifyToken, gifComments.flagGifComment);
app.delete('/api/v1/gifs/:gifid/comments/:commentid', verifyToken, gifComments.deleteGifComment);

// Feed Routes
app.get('/api/v1/feed', verifyToken, feed.getFeed);



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    error: err.message
  });
});


module.exports = app;
