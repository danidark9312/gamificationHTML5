var i = 1;
var canvas;
var yBouncePoint = 0;
var xBouncePoint = 0;
var isStarted = false;
var ballArray = [];
var graceTime = 200;
var canvasWidth = 800;
var debug = false;



var settings = {
		balls: 1,
		fps:40,
		startingSpeed : 2,
		maxRadius : 70,
		maxNumber : 200,
		maxTotalBalls: 500,
		maxSpeed : 7

	}	


function startFollow(){
	var color = $("[name=color]:checked").val();
	var radius = parseInt($("#radius").val());
	var number = $("#number ").val() || 1;
	var startingSpeed = $("#speed").val() || settings.startingSpeed;
	
	startingSpeed = startingSpeed > settings.maxSpeed ? settings.maxSpeed :startingSpeed;
	startingSpeed= startingSpeed < 0 ? undefined :startingSpeed;
	
	radius = radius > settings.maxRadius ? settings.maxRadius : radius;
	radius = radius < 0 ? undefined : radius;
	
	number = number > settings.maxNumber ? settings.maxNumber : parseInt(number); 
	number = number < 1 ? 1 : number;
	
	if((number+ballArray.length)>settings.maxTotalBalls)
		number = settings.maxTotalBalls - ballArray.length;
	
	for (var i = 0; i < number; i++) {
		var ball = new Ball({
			x : 50,
			y : 50
		}, 100);
		
		if(color)
			ball.color = color;
		if(radius)
			ball.radius = radius;
		if(startingSpeed)
			ball.startingSpeed = startingSpeed; 
		
		ball.opacity = 0.4;
		ball.speed = ball.startingSpeed*(Math.random()+1);
		ball.startAngle = Math.random() * 90;

		if(ball.initPos.x<ball.radius){
			ball.initPos.x += ball.radius;
		}
		if(ball.initPos.y<ball.radius){
			ball.initPos.y += ball.radius;
		}
		
		var radius = ball.radius;

		if(!canvas){
			canvas = document.getElementById("canvas");
			canvas.onclick = canvasClickListener;
			
		}
		
		
		var Xdirection = 1;
		var radiansAngle = getRadians(ball.startAngle);
		ball.direction.y = Math.tan(radiansAngle);

		
		ball.start();
		ballArray.push(ball);
		cleanArray();
		
	}
	 
	if(!isStarted){
		isStarted = true;
		
		canvas.width = canvasWidth;
		canvas.height = window.innerHeight;
		canvas.style.display = "block";
		var ctx = canvas.getContext("2d");
		
		setInterval(function(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			 for (var i = 0;i<ballArray.length;i++){
				 ball = ballArray[i];
				 if (ball.isAlive) {
					ctx.beginPath();
					
					ball.initPos.x += ((ball.getAxisSpeed().x) * ball.direction.x);
					ball.initPos.y = (ball.initPos.x * ball.direction.y)
							- (ball.bouncingPoint.x * ball.direction.y)
							+ ball.bouncingPoint.y;
					
					if(ball.radius<2)
						ball.radius = 2;
					if(ball.radius>(canvas.height/2) || ball.radius>(canvas.width/2))
						ball.radius = 2;
					
					ctx.arc(ball.initPos.x, ball.initPos.y, ball.radius, 0,(2 * Math.PI) / 1);
					
					ctx.stroke();
					ctx.fillStyle = "rgba("+ball.color+","+ (ball.opacity -= 0.00002) + ")";
					ctx.fill();
					
					if(debug)
						showDebugInfo(ctx,ball);
					
					
					
					if (ball.initPos.x + ball.radius >= canvas.width || ball.initPos.x - ball.radius < 0) {
						ball.changeXdirection();
						ball.radius -= 0.2;
						
						if(ball.speed>1)
							ball.speed -= 0.2;
						else
							ball.speed = 1;
						
					}
					if (ball.initPos.y + ball.radius >= canvas.height|| ball.initPos.y - ball.radius < 0) {
						ball.changeYdirection();
						ball.radius -= 0.2;
						if(ball.speed>1)
							ball.speed -= 0.2;
						else
							ball.speed = 1;
					}
					if (ball.opacity <= 0) {
						//ball.kill();
					}
					 ball.timeLife++;
				}
				 validateBallImpact(ball);
			}
			},1000/settings.fps)
	}
}

function changeDirection(x) {
	x*=-1;
	return x;
}

function getRadians(degree){
	return (degree/180)*Math.PI;
}
function getDegrees(radian){
	return 180*(radian/Math.PI);
}
function cleanArray(){
	var newArray = [];
	for(var i = 0;i<ballArray.length;i++){
		if(ballArray[i].isAlive)
			newArray.push(ballArray[i]);
	}
	ballArray = newArray;
}

function validateBallImpact(ball) {
	var currentIndex = (ballArray.indexOf(ball));
	var flag = true;
	for (var i = 0; i < ballArray.length && flag; i++) {
		var ball2 = ballArray[i];
		if (i != currentIndex && ball2.isAlive && ball.isAlive && ball.timeLife>graceTime && ball2.timeLife>graceTime) {
			
			var distance = getTwoPointsDistance(ball.initPos,ball2.initPos);
			
			if(distance<((ball.radius+ball2.radius))){
				
				if((ball.speed*ball.radius)>(ball2.speed*ball2.radius)){
					ball2.kill();
					ball.speed+=/*0.1*/ball2.speed*0.1;
					ball.radius+=(ball2.radius*0.2);
					ball.opacity+=0.05;
					flag = false;
					cleanArray();
				}
				else{
					ball.kill();
					ball2.speed+=/*0.1*/ball.speed*0.1;
					ball2.radius+=(ball.radius*0.2);
					ball2.opacity+=0.05;
					flag = false;
					cleanArray();
				}
			}
		}
	}
}

function showDebugInfo(ctx,ball){
	ctx.font = "15px Arial";
	ctx.fillStyle="black";
	ctx.fillText(ball.name, ball.initPos.x-10, ball.initPos.y-15);
	ctx.fillText("speed"+Math.floor(ball.speed), ball.initPos.x-10, ball.initPos.y);
	//ctx.fillText("pos"+Math.floor(ball.initPos.x)+","+Math.floor(ball.initPos.y),ball.initPos.x-10, ball.initPos.y);
	//ctx.fillText("pendiente: "+getDegrees(Math.atan(ball.direction.y)),ball.initPos.x-10, ball.initPos.y);
	//ctx.fillText(Math.atan(ball.direction.y), ball.initPos.x-10, ball.initPos.y+15);
	//ctx.fillText("radius"+Math.floor(ball.radius), ball.initPos.x-10, ball.initPos.y+15);
	ctx.fillText(ballArray.length, 10, 30);
}

function getTwoPointsDistance(pointA,pointB){
	if(!pointA || !pointB)
		return;
	
	return Math.sqrt(Math.pow(pointB.x-pointA.x,2)+(Math.pow(pointB.y-pointA.y,2)));
}

function findBallsAt(point){
	var ball;
	var ballsFound = [];
	for(var i = 0 ;i < ballArray.length;i++){
		ball = ballArray[i];
		var distance = (getTwoPointsDistance(point,ball.initPos));
		if(distance<ball.radius && ball.isAlive){
			ballsFound.push(ball);
		}
	}
	return ballsFound;
}

function canvasClickListener(event){
	
		var xCanvasPos = (event.clientX-this.getBoundingClientRect().left);
		var yCanvasPos = (event.clientY-this.getBoundingClientRect().top);
		
		var balls = findBallsAt({x:xCanvasPos,y:yCanvasPos});
		if(balls.length>0){
			
			var ballParent = balls[0]; 
			ballParent.kill();
		for(var i = 0 ; i < 3 ; i++){
			var ball = new Ball(
					{
						x:ballParent.initPos.x,
						y:ballParent.initPos.y,
						}
			, 100);
			
			//getDegrees(Math.atan(ball.direction.y))
			if(i == 2){
				ball.direction.y = Math.tan(getRadians(getDegrees(Math.atan(ballParent.direction.y))+15));	
			}else if(i==1){
				ball.direction.y = Math.tan(getRadians(getDegrees(Math.atan(ballParent.direction.y))-15));;
			}else{
				ball.direction.y = ballParent.direction.y;
			}
			ball.direction.x = ballParent.direction.x;
			ball.radius = ballParent.radius*0.6;
			ball.color = ballParent.color;
			ball.opacity = ballParent.opacity;
			ball.timeLife = 50;
			ball.speed = (ballParent.speed*0.5)+(1*Math.random());
			ball.start();
			ballArray.push(ball);
	}
		
		}
	
}