
var fs = require('fs'),
    path = require('path');

/*
 * POST file upload 
 */

exports.upload = function(req, res){
    console.log(req.files);

    var tempPath = req.files.SelectedFile.path,
        targetPath = "uploads/" + req.files.SelectedFile.name;

    fs.rename(tempPath, targetPath, function(err) {
        if (err){ 
            console.log(err);
            throw err;
        }
        console.log("Upload completed!");
    });
    res.send(200, targetPath);
};

/*
 * GET download uploaded file 
 */

exports.fetch = function(req, res){
    var file = req.params.filename;
    console.log("getting " + file);
    res.sendfile(file, {root: './uploads'});
};
