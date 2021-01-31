const express = require("express");
const router = express.Router();
const multer = require("multer");
// const multerGS = require("multer-google-storage");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { Storage } = require("@google-cloud/storage");
require('dotenv').config();


const storage = new Storage({
  // keyFilename: path.join(__dirname, "../backend-303114-5f186b208c6c.json"),
  projectId: process.env.GCLOUD_PROJECT,
  credentials:{client_email:process.env.GCS_CLIEN_EMAIL,
  private_key:process.env.GCLOUD_PRIVATE_KEY}
  // filename:
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

let uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits:{ 
    fileZise: 20000000
  }
});


router.post('/upload',uploadHandler.single('file'),(req, res)=>{  
  console.log(req.file);
  const newFileName= uuidv4()+path.extname(req.file.originalname);
  const blob = bucket.file(newFileName);
  const blobStream=blob.createWriteStream({
  resumable: false,
  gzip:true
  }).on('finish',()=>{
    const publicURL=`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
    //const imageDetails=JSON.parse(req.body);
    imageDetails.image=publicURL;res.json('ok');
    });
  blobStream.end(req.file.buffer);
  res.json('ok');
});









module.exports = router;
