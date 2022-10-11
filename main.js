song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {-6
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    
    if(ScoreLeftWrist > 0.2){
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        RemoveDecimals = floor(InNumberLeftWristY);
        volume = RemoveDecimals/500;
        Document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setvolume(volume);
    }
    if(ScoreRightWrist > 0.2){   
         
        circle(rightWristX, rightWristY, 20);
    
        if(rightWristX > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    
        else if(rightWristX > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
    
        else if(rightWristX > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
    
        else if(rightWristX > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    
        else if(rightWristX > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if(results.length > 0) 
    {

        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreRightWrist = " + ScoreRightWrist + "ScoreLeftWrist = " + ScoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}