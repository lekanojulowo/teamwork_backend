// Configuration files
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const db = require("../config");
const tableG = "gifs";
const tableC = "gif_comments";


cloudinary.config({ 
  cloud_name: 'lekanojulowo', 
  api_key: '337393788934633', 
  api_secret: 'jJpQX4t79qTtfcwd081j_nJ2fIg' 
});

// query functions

// Get fetch all gif
const getAllGifs = (req, res, next) => {
  db.any(`select * from ${tableG} order by createdon desc`)
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

// Get  fetch single gif
const getSingleGif = (req, res, next) => {
  const gifId = parseInt(req.params.id);
  db.one(`select gifid id, createdon, title, imageurl url from ${tableG} where gifid = $1`, gifId)
    .then((data) => {
      const {id, createdon, title, url} = data;
      db.any(`select commentid, userid authorid, comment from ${tableC} where gifid = $1 order by createdon desc`, gifId)
        .then((comments) => { 
          res.status(200)
              .json({
                status: 'success',
                data: {
                  id,
                  createdon,
                  title,
                  url,
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

  // POST: Create gif
  const createGif = (req, res, next) => {
    jwt.verify(req.token, '12345secret67890', (err, authData) => {
      if(err){
      return res.status(403)
        .json({
        "status": "error",
        "error": "Forbidden: Unauthorize Access"        
      })
      }
    
    const image = req.files.image;    
    
    if(image.mimetype !== 'image/gif'){
      return res.status(500).send("Error: Please upload a gif image");
   }
 
    image.mv(`./uploads/${image.name}`, (err)=>{
      if(err){
       return res.status(500).send(err);
    }
    
    cloudinary.uploader.upload(`./uploads/${image.name}`, function(error, result) {
      if(error){
        return res.status(500).send(error);
    }

    const userid = authData.userid;
    const imageUrl = result.url;
    const title = req.body.title;
    const values = [userid, imageUrl, title];
    db.one(`insert into ${tableG}(userid, imageurl, title) values($1, $2, $3) returning gifid, createdon`, [...values])
      .then((data) => { 
        res.status(200)
          .json({
            status: 'success',
            data: {
              gifId: data.gifid,             
              message: 'GIF image successfully posted',
              createdOn: data.createdon,
              title,
              imageUrl 
            }
          });
      });
    });
  });
  });
}
  
  // PATCH update gif
  const updateGif = (req, res, next) => {
    db.none(`update ${tableG} set title=$1, where gifid=$2`,
    [req.body.title, parseInt(req.params.id)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'gif post successfully updated'
          }
        });
      })
      .catch((err) => {
        return next(err);
      });
    }
  
  // PATCH flag gif
  const flagGif = (req, res, next) => {
    db.none(`update ${tableG} set appropriate=$1 where gifid=$2`,
    [false, parseInt(req.params.id)])
      .then(() => {
        res.status(200)
        .json({
          status: 'success',
          data:{
            message: 'gif post successfully flagged as inappropriate'
          }
        });
      })
      .catch((err) => {
        return next(err);
      });
    }
    
    // DELETE delete gif
    const deleteGif = (req, res, next) => {
      jwt.verify(req.token, '12345secret67890', (err, authData) => {    
        if(err || !authData.admin){
          return res.status(403)
            .json({
            "status": "error",
            "error": "Forbidden: Unauthorize Access"
          })
        }
      db.none(`delete from ${tableG} where gifid = $1 and appropriate=$2`, [parseInt(req.params.id), false])
      .then(() => {
        /* jshint ignore:start */        
        res.status(200)
        .json({
          status: 'success',
          data: {
            message: `gif post successfully deleted`
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
  getAllGifs,
  getSingleGif,
  createGif,
  updateGif,
  flagGif,
  deleteGif
};

