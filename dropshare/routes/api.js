
var fs = require('fs');

/*
 * POST file upload 
 */

exports.upload = function(req, res){
    console.log(req.files);

    var tempPath = req.files.SelectedFile.path,
        targetPath = path.resolve('./uploads/' + req.files.SelectedFile.name);

    fs.rename(tempPath, targetPath, function(err) {
        if (err) throw err;
        console.log("Upload completed!");
    });
};
