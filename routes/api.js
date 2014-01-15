
// token for bit.ly API
var ACCESS_TOKEN = '740afd7dcf2532581a6cf64d654c7f1a5c7e372d';

var fs = require('fs'),
    path = require('path'),
    http = require("http"),
    https = require("https");

/*
 * POST file upload 
 */

exports.upload = function(req, res){

    var tempPath = req.files.SelectedFile.path,
        targetPath = "uploads/" + req.files.SelectedFile.name;

    fs.rename(tempPath, targetPath, function(err) {
        if (err){ 
            console.log(err);
            throw err;
        }
        console.log("Upload completed!");
    });

    var fullPath = 'http://dropload.apps.sigsegv.is/api/fetch/' + req.files.SelectedFile.name;
    //var fullPath = 'localhost:3000/api/fetch' + req.files.SelectedFile.name;

    // Request to bit.ly
    var options = {
        host: 'api-ssl.bitly.com',
        path: '/v3/shorten?access_token=' + ACCESS_TOKEN + '&longUrl=' + fullPath,
    };

    console.log(options);

    var data = '';
    var request = https.request(options, function(response)
    {
        console.log(options.host + ':' + response.statusCode);
        response.setEncoding('utf8');

        response.on('data', function(d) {
            data += d;
        })

        response.on('end', function() {
            console.log(data);
            var resp = JSON.parse(data);
            console.log(resp.data.url);
            res.send('200', resp.data.url);
        })
    });

    request.on('error', function(err) {
        console.log('error :(');
        res.send('error: ' + err.message);
    });

    request.end();

};

/*
 * GET download uploaded file 
 */

exports.fetch = function(req, res){
    var file = req.params.filename;
    console.log("getting " + file);
    res.sendfile(file, {root: './uploads'});
};

