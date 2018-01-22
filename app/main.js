let video = document.getElementById('videoInput');
navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log('Camera Error: ' + err.name + ' ' + err.message);
        });

var cascadeFile = 'haarcascade_frontalface_default.xml';

let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
let gray = new cv.Mat();
let cap = new cv.VideoCapture(video);
let faces = new cv.RectVector();
let classifier = new cv.CascadeClassifier();

if (classifier.load('/Users/anmoluppal/Downloads/cascades/haarcascade_frontalface_default.xml')) {
    console.log("yes");
} else {
    console.log("no");
}

if (false) {
    console.log("yes");
} else {
    console.log("no");
}

const FPS = 30;
function processVideo() {
    try {
        let begin = Date.now();
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        for (let i = 0; i < faces.size(); ++i) {
            let face = faces.get(i);
            let point1 = new cv.Point(face.x, face.y);
            let point2 = new cv.Point(face.x + face.width, face.y + face.height);
            cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
        }
        cv.imshow('canvasOutput', dst);
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
        console.log(err);
    }
};

setTimeout(processVideo, 0);
