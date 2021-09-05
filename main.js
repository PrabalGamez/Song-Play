m1="";
m2="";
lwx=0;
lwy=0;
rwx=0;
rwy=0;
lws=0;
rws=0;
status1="";
status2="";

function preload(){
    m1=loadSound("DJ Snake.mp3");
    m2=loadSound("ATW.mp3");
}

function setup(){
    canvas=createCanvas(550, 450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 550, 450);

    status1=m1.isPlaying();
    status2=m2.isPlaying();

    if (lws > 0.2) {
    fill("#000000");
    stroke("#000000");
    circle(lwx, lwy, 40);
    m2.stop();
    if (status1 == false){
        m1.play();
        document.getElementById("song-playing").innerHTML="Turn Down for What?";
    }}

    if (rws > 0.2) {
        fill("#ffffff");
        stroke("#ffffff");
        circle(rwx, rwy, 40);
        m1.stop();
        if (status2 == false){
            m2.play();
            document.getElementById("song-playing").innerHTML="Around The World";
        }}
}

function modelLoaded(){
    console.log("ModelLoaded :)")
}

function gotPoses(result){
    if (result.length > 0){
        console.log(result);
        //Left-Wrist
        lwx=result[0].pose.leftWrist.x;
        lwy=result[0].pose.leftWrist.y;
        //Right-Wrist
        rwx=result[0].pose.rightWrist.x;
        rwy=result[0].pose.rightWrist.y;
        //Wrists-Score
        lws=result[0].pose.keypoints[9].score;
        rws=result[0].pose.keypoints[10].score;
    }
}