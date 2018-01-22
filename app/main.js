function main() {
  startCamera();
  detectFace();
//  recogFace();
//  markDB();
}

startCamera() {
  let video = document.getElementById("inputVideo");
  navigator.getUserMedia(video: true, audio: false);
}

detectFace() {
  cv.FS_createPreloadFile();
}
