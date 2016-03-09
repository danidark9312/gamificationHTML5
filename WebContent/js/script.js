var fps = 30;
var initSize = 10;
var initPos = [0,0];
var speed = 1;
var canva;
var teta = 1;

var longShoot = 200;

function startAnim(){
	canva = document.getElementById("animationCanva");
	var redCube;
			
		redCube = document.createElement("div");
		
		redCube.className = "redCube";
		redCube.style.height= initSize+"px";
		redCube.style.display= "inline";
		
		redCube.style.width = initSize+"px";
		redCube.style.left = initPos[0]+"px";
		redCube.style.top = initPos[1]+"px";
		canva.appendChild(redCube);
		
		var size = initSize;
		var interval = setInterval(function(){
			
			redCube.style.height= (size+=2)+"px";
			redCube.style.width= (size+=2)+"px";
			if(size > 20){
				clearInterval(interval);
				startMovin(redCube);
			}
				
		},1000/fps);
}

function startMovin(redCube){
	var pos = [initPos[0],initPos[1]];
	var ang = teta;
	teta+=10;
	//pos[0]+=speed
	
	
	var rand = Math.random()*90;
	var maxAngle = 90;
	var pendiente = Math.tan((rand)*(((Math.PI)/180)));
	
	var xLimitMove = Math.sin(Math.atan(pendiente))*longShoot;
	var yLimitMove = Math.cos(Math.atan(pendiente))*longShoot;
	console.log("long en y: "+yLimitMove);
	console.log("long en x: "+xLimitMove);
	
	var interval = setInterval(function(){
		var ymov = pendiente*pos[0]
		redCube.style.top = (speed)*(ymov+=speed)+"px"; 
		redCube.style.left = (speed)*(pos[0]+=speed)+"px";
		
		if((ymov*ymov)+(pos[0]*pos[0])>(longShoot*longShoot)){
			redCube.style.backgroundColor = "blue";
			clearInterval(interval);
		}
		/*if(180 < ymov || 180 < pos[0]){
			clearInterval(interval);
		}*/
	},1000/fps)
}


function showCoin(coin){
	
	var div = document.createElement("div");
	var btn = document.createElement("button");
	var img = document.createElement("img");
	
	
	
	img.src = coin;
	
	btn.onclick=function(){
		$(this).closest("div").fadeOut(400,function(){
			$(this).closest("div").remove()
			clearBackScreen();
			}
			);
		};
	btn.appendChild(document.createTextNode("ENTENDIDO"))
	btn.className = "btn-primary";
	div.style.left=((window.innerWidth/2)-(300/2))+"px";
	div.style.width="300px	";
	div.style.top=((window.innerHeight/2)-(240/2))+"px";
	div.style.opacity = "0.0";
	
	div.className="centerDiv";
	div.appendChild(img);
	div.appendChild(btn);
	
	document.body.appendChild(div);
	
	showBlackScreen(500);
	$(div).animate({opacity:"1"},500,function(){
			
	});
	
	
}

function showBlackScreen(time){
	var backDiv = document.createElement("div");
	backDiv.className="backScreen";
	backDiv.style.height=window.innerHeight+"px";
	backDiv.style.opacity="0.0"
	document.body.appendChild(backDiv);
	$(backDiv).animate({opacity:"0.5"},time);
}
