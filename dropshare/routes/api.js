
var fs = require('fs'),
    path = require('path');

/*
 * POST file upload 
 */

exports.upload = function(req, res){
    console.log(req.files);

    var tempPath = req.files.SelectedFile.path,
        targetPath = req.files.SelectedFile.name;

    fs.rename(tempPath, targetPath, function(err) {
        if (err){ 
            console.log(err);
            throw err;
        }
        console.log("Upload completed!");
    });
};
