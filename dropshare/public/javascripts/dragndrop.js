
var dropbox = document.getElementById("dropbox");

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

// event handlers

dropbox.addEventListener("dragenter", noopHandler, false);
dropbox.addEventListener("dragexit", dragExit, false);
dropbox.addEventListener("dragover", dragOver, false);
dropbox.addEventListener("drop", drop, false);

// no-op handler to stop event propagation
function noopHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.className = "drophover";
}

function dragExit(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.className = "";
}
    

function drop(evt){
    evt.stopPropagation();
    evt.preventDefault();
     
    var files = evt.dataTransfer.files;
    var count = files.length;
     
    // Only call the handler if 1 or more files was dropped.
    if (count > 0)
        handleFiles(files);
}

function handleFiles(files) {
    var file = files[0];
    var reader = new FileReader();

    // init reader event handlers
    reader.onload = handleReaderLoad;

    // read things
    reader.readAsDataURL(file);
}

function handleReaderLoad(evt) {
    var img = document.getElementById("preview");
    img.src = evt.target.result;
}
