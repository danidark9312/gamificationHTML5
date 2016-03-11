var i = 1;
var yBouncePoint = 0;
var xBouncePoint = 0;

function Ball(initpos,speed,radius,startAngle) {
	this.initPos = initpos;
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
		setInterval(function(){
			 
			 ctx.clearRect(0, 0, canvas.width, canvas.height);
			 ctx.fillStyle = "black";
			 ctx.beginPath();
			 this.initPos.x+=(this.speed*this.direction.x);
			 this.initPos.y =(this.initPos.x*this.direction.y)-(this.direction.x*this.direction.y)+this.bouncingPoint.x;
			 ctx.arc(this.initPos.x,this.initPos.y,this.radius,0,(2*Math.PI)/1);
			 ctx.stroke();
			 
			 if(pos[0]+radius>=canvas.width || pos[0]-radius<0){
				 this.direction.x = changeDirection(direction.x);
				 this.direction.y = changeDirection(direction.y);
				 this.bouncingPoint.y = this.initPos.y;
				 this.bouncingPoint.x = this.initPos.x
			 }
			 if(initPos.x+radius>=canvas.height || initPos.y-radius<0){
				 direction.y = changeDirection(direction.y);
				 this.bouncingPoint.y = this.initPos.y;
				 this.bouncingPoint.x = this.initPos.x
			 }
			},1000/35)
	}
	
}

var settings = {
		speed : 20 ,
		r:40,
		startAngle:35
	}	


function startFollow(){
	 var ball = new Ball({x:100,y:100});
	 ball.speed=30;
	 ball.startAngle=/*Math.random()*/10;
	 
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
	 /*
	 xBouncePoint = ball.bouncingPoint.x;
	 yBouncePoint = ball.bouncingPoint.y;
	 */
	 
	
}

function changeDirection(x) {
	x*=-1;
	return x;
}

function getRadians(degree){
	return (degree/180)*Math.PI;
}