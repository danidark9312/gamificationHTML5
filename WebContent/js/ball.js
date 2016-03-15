var indexBalls = 0;

function Ball(initpos,speed,radius,startAngle) {
	this.initPos = initpos;
	this.context;
	this.color = "205,110,100"; //defaultColor
	this.gravity = 1;
	this.isAlive = false;
	this.axisSpeed; 
	this.timeLife = 0;
	this.name;
	this.opacity = 1;
	this.Yspeep = 2;
	this.speed = speed || 20 ;
	this.radius=radius || 40;
	this.startAngle=startAngle || 35;
	this.direction = {
		x:1,y:1
	};
	
	
		
	
	this.name = "ball:"+(++indexBalls);
	
	this.getAxisSpeed = function (){
		/*if(this.axisSpeed){
			return this.axisSpeed;
		}*/
		if (!this.speed || !this.startAngle){
			return undefined;
		}else{
			this.axisSpeed = {
					angle:this.startAngle,
					speed:this.speed,
					x : Math.cos(getRadians(this.startAngle))*this.speed, 
					y : Math.sin(getRadians(this.startAngle))*this.speed 
				};
			return this.axisSpeed;
		}
	};
		
	this.bouncingPoint = {
		x:this.initPos.x,
		y:this.initPos.y
	};	
	
	this.start = function start(){
		this.isAlive = true;
	};
	
	this.changeXdirection = function(){
		this.direction.x = changeDirection(this.direction.x);
		this.direction.y = changeDirection(this.direction.y);
		this.bouncingPoint.y = this.initPos.y;
		this.bouncingPoint.x = this.initPos.x;
	}
	this.changeYdirection = function(){
		this.direction.y = changeDirection(this.direction.y);
		this.bouncingPoint.y = this.initPos.y;
		this.bouncingPoint.x = this.initPos.x;
	}
	this.kill = function (){
		this.isAlive = false;
	}
	
	
}
