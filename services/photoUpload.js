const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bucket = process.env.AWS_S3_BUCKET;
const mime = require("mime");
const path = require("path");
const md5 = require("md5");
const fs = require("fs");
//const _ = require("lodash");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { User } = require("../models");

const FileUploader = {};

FileUploader.upload = async (file) => {
  const extension = mime.extension(file.mimetype);

  const filename = path.parse(file.name).name;

  return new Promise((resolve, reject) => {
    // S3 request options
    const options = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${filename}-${md5(Date.now())}.${extension}`,
      Body: file.data,
    };

    s3.upload(options, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const photo = {
          url: data.Location,
          name: data.key,
        };
        console.log("photo", photo);
        resolve(photo);
      }
    });
  });
};

FileUploader.remove = (id) => {
  // Configure the request
  const options = {
    Bucket: bucket,
    Key: id,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(options, (err, data) => {
      // Reject if error
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      // } else {

      //   // Delete the photo from the JSON
      //   // file-based database
      //   // if successful and resolve
      //   // the photo data
      //   const photos = require(PHOTO_DATA_PATH);
      //   const photo = _.clone(photos[id]);
      //   delete photos[id];
      //   _writePhotoDataFile(photos);
      //   resolve(photo);
      // }
    });
  });
};

FileUploader.single = (field) => upload.single(field);

module.exports = FileUploader;
