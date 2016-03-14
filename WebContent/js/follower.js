var i = 1;
var yBouncePoint = 0;
var xBouncePoint = 0;
var isStarted = false;
var ballArray = [];
var graceTime = 200;
var canvasWidth = 800;



var settings = {
		balls: 1,
		fps:40,
		startingSpeed : 2
	}	


function startFollow(){
	var color = $("[name=color]:checked").val();
	var radius = parseInt($("#radius").val());
	var number = $("#number ").val() || 1;
	
	for (var i = 0; i < number; i++) {
		var ball = new Ball({
			x : 50,
			y : 50
		}, 100);
		
		if(color){
			ball.color = color;
		}
		if(radius){
			ball.radius = radius;
		}
		ball.opacity = 0.4;
		ball.speed = settings.startingSpeed*(Math.random()+1);
		ball.startAngle = Math.random() * 90;

		var radius = ball.radius;

		var canvas = document.getElementById("canvas");
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
		//canvas.height = window.innerHeight;
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
					
					ctx.arc(ball.initPos.x, ball.initPos.y, ball.radius, 0,
							(2 * Math.PI) / 1);
					ctx.stroke();
					ctx.fillStyle = "rgba("+ball.color+","
							+ (ball.opacity -= 0.00002) + ")";
					ctx.fill();
					
					
					/*ctx.font = "15px Arial";
					ctx.fillStyle="black";
					ctx.fillText(ball.name, ball.initPos.x-10, ball.initPos.y);*/
					
					
					if (ball.initPos.x + ball.radius >= canvas.width || ball.initPos.x - ball.radius < 0) {
						ball.changeXdirection();
						ball.radius -= 0.2;
					}
					if (ball.initPos.y + ball.radius >= canvas.height|| ball.initPos.y - ball.radius < 0) {
						ball.changeYdirection();
						ball.radius -= 0.2;
					}
					if (ball.opacity <= 0) {
						ball.kill();
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
	for (var i = 0; i < ballArray.length; i++) {
		var ball2 = ballArray[i];
		if (i != currentIndex && ball2.isAlive && ball.isAlive && ball.timeLife>graceTime && ball2.timeLife>graceTime) {
			var distance = Math.sqrt(Math.pow(ball2.initPos.x-ball.initPos.x,2)+(Math.pow(ball2.initPos.y-ball.initPos.y,2)));
			
			if(distance<((ball.radius+ball2.radius))){
				
				if((ball.speed*ball.radius)>(ball2.speed*ball2.radius)){
					ball2.kill();
					ball.speed+=0.1;
					ball.radius+=(ball2.radius*0.2);
					ball.opacity+=0.01;
				}
				else{
					ball.kill();
					ball2.speed+=0.1;
					ball2.radius+=(ball.radius*0.2);
					ball2.opacity+=0.01;
				}
					
				cleanArray();
			}
			
			/*if (ball.initPos.x + ball.radius < ball2.initPos.x - ball2.radius
						&& ball.initPos.y + ball.radius < ball2.initPos.y - ball2.radius
						&& ball.initPos.x < ball2.initPos.x && ball.initPos.y < ball2.initPos.y 
						) {
				ball2.kill();
				cleanArray();}
				*/
			/* else if (ball.initPos.x - ball.radius < ball2.initPos.x + ball2.radius
						&& ball.initPos.y - ball.radius < ball2.initPos.y + ball2.radius
						&& ball.initPos.x > ball2.initPos.x && ball.initPos.y > ball2.initPos.y
						) {
				ball2.kill();
				cleanArray();
			}*/
			/* else if (ball.initPos.x - ball.radius < ball2.initPos.x + ball2.radius
						&& ball.initPos.y + ball.radius < ball2.initPos.y - ball2.radius
						&& ball.initPos.x > ball2.initPos.x && ball.initPos.y < ball2.initPos.y
						) {
				ball2.kill();
				cleanArray();
			} else if (ball.initPos.x + ball.radius < ball2.initPos.x - ball2.radius
						&& ball.initPos.y - ball.radius < ball2.initPos.y + ball2.radius
						&& ball.initPos.x < ball2.initPos.x && ball.initPos.y > ball2.initPos.y
						) {
				ball2.kill();
				cleanArray();
			}
			 	*/
		}
	}
}