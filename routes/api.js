'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');

const ACCESS_TOKEN = process.env.BITLY_TOKEN;
const BASE_URL = process.env.BASE_URL;


function getBitlyUrl (filename) {
  let promise = new Promise(function (resolve, reject) {
    let fullPath = BASE_URL + '/api/fetch/' + path.basename(filename);
    let options = {
        host: 'https://api-ssl.bitly.com',
        path: '/v3/shorten?access_token=' + ACCESS_TOKEN + '&longUrl=' + fullPath,
    };
    request.get(`${options.host}${options.path}`, function (err, res, body) {
      if (err)
        reject(err);

      let url = JSON.parse(body).data.url;
      resolve(url);
    });
  });
  return promise;
}

/*
 * POST file upload
 */
exports.upload = function(req, res){
  if (req.busboy) {
    let targetPath;
    req.busboy.on('file', function (field, file, filename) {
      targetPath = path.join('uploads', path.basename(filename));
      file.pipe(fs.createWriteStream(targetPath));
    });

    req.busboy.on('error', console.error);

    req.busboy.on('finish', function () {
      getBitlyUrl(targetPath).then((url) => {
        res.status(200).send({ url });
      }).catch((err) => {
        console.error(err);
        res.status(500).send({ error: err });
      });
    });
  } else {
    res.status(400).end();
  }

};

/*
 * GET download uploaded file
 */

exports.fetch = function(req, res){
    var file = req.params.filename;
    console.log("getting " + file);
    res.sendFile(file, {root: './uploads'});
};
