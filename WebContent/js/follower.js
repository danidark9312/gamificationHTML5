var i = 1;
function startFollow(){
	 var canvas = document.getElementById("canvas");
	 var ctx = canvas.getContext("2d");
	setInterval(function(){
	 ctx.clearRect(0, 0, canvas.width, canvas.height);
	 ctx.fillStyle = "black";
	 ctx.beginPath();
	 ctx.arc(40+i,40+i,40,0,2*Math.PI);
	 i++;
	 ctx.stroke();
	},1000/16);
}