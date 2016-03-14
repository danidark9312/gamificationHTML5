var i = 1;
var yBouncePoint = 0;
var xBouncePoint = 0;

function Ball(initpos,speed,radius,startAngle) {
	this.initPos = initpos;
	this.context;
	this.speed = speed || 20 ;
	this.radius=radius || 40;
	this.startAngle=startAngle || 35;
	this.direction = {
		x:1,y:1
	};
	
	this.bouncingPoint = {
		x:this.initPos.x,
		y:this.initPos.y
	}	
	
	this.start = function start(ctx){
		var ball = this;
		
	}
	
}

var settings = {
		speed : 20 ,
		r:40,
		startAngle:35
	}	


function startFollow(){
	 var ball = new Ball({x:100,y:100});
	 ball.speed=2;
	 ball.startAngle=/*Math.random()*/45;
	 
	 var speed = ball.speed;
	 var radius = ball.radius;
	 
	 var canvas = document.getElementById("canvas");
	 var localSpeed = ball.speed; 
	 var pos = [radius+30,0];
	 var Xdirection = 1;
	 var Ydirection = Math.tan(getRadians(ball.startAngle));
	 
	 canvas.width=window.innerWidth;
	 canvas.height=window.innerHeight;
	 canvas.style.display = "block";
	 var ctx = canvas.getContext("2d");
	 ball.start(ctx);
	
	 setInterval(function(){
			
		 ctx.clearRect(0, 0, canvas.width, canvas.height);
		 ctx.fillStyle = "black";
		 ctx.beginPath();
		 ball.initPos.x+=(ball.speed*ball.direction.x);
		 ball.initPos.y =(ball.initPos.x*ball.direction.y)-(ball.bouncingPoint.x*ball.direction.y)+ball.bouncingPoint.y;
		 ctx.arc(ball.initPos.x,ball.initPos.y,ball.radius,0,(2*Math.PI)/1);
		 ctx.stroke();
		 
		 if(ball.initPos.x+radius>=canvas.width || ball.initPos.x-radius<0){
			 ball.direction.x = changeDirection(direction.x);
			 ball.direction.y = changeDirection(direction.y);
			 ball.bouncingPoint.y = ball.initPos.y;
			 ball.bouncingPoint.x = ball.initPos.x
		 }
		 if(ball.initPos.y+radius>=canvas.height || ball.initPos.y-radius<0){
			 ball.direction.y = changeDirection(ball.direction.y);
			 ball.bouncingPoint.y = ball.initPos.y;
			 ball.bouncingPoint.x = ball.initPos.x
		 }
		},1000/35)
	 
	
}

function changeDirection(x) {
	x*=-1;
	return x;
}

function getRadians(degree){
	return (degree/180)*Math.PI;
}