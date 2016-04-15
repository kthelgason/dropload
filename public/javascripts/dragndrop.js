
var dropbox = document.getElementById("dropbox");

if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
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

  this.className = "";
}

function handleFiles(files) {
  var file = files[0],
      reader = new FileReader(),
      urlbox = document.getElementById("link");

  var resp;

  var data = new FormData();
  data.append('SelectedFile', file);

  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      try {
        resp = JSON.parse(request.response);
        urlbox.value = resp.url;
      } catch (e){
        resp = {
          status: 'error',
          data: 'Unknown error occurred: [' + request.responseText + ']'
        };
      }
      console.log(resp);
    }
  };

  request.open('POST', 'api/upload');
  request.send(data);
}
