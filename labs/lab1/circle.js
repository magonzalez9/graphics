window.onload = function(){
    // Array where all circle objects will be stored.
     circles = [];
	 canvas = document.getElementById("myCanvas");
     ctx = canvas.getContext("2d");

     //Used to get canvas coordinates
     rect = canvas.getBoundingClientRect();
}

//Class: Circle
//Description:
//Params: 
function Circle(event) {
	this.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	this.y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
	this.radius = Math.floor((Math.random() * 30) + 10);
}

//Function: generateCircle
//Description: generates the circle to be created on the canvas. 
//Params: none
//Returns: none
Circle.prototype.drawCircle = function() {
	//Generate Circle
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
	ctx.stroke();
	ctx.closePath(); 

    document.getElementById("circleDescription").innerHTML = "X POS: " + Math.round(this.x) + "<br>" + 
                                                             "Y POS: " + Math.round(this.y) + "<br>"+ 
                                                             "Radius: " + this.radius + "<br>" +
                                                             "Circles Created: " + circles.length; 
}

//Function: draw
//Description: Draws circle onto canvas and adds the circle object to info array. 
//Params: event
//Returns: none
function drawOnCanvas(event){
    circleObj = new Circle(event);
    circles.push(circleObj);  
	circleObj.drawCircle(); 
}

//Function: colorCircle
//Description: Redraws the exisiting circles but fills them with a random color. 
//Params: none
//Returns: none
function colorCircle(){
	for (var i = 0; i < circles.length; i++) {
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].radius,0,2*Math.PI);
		ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);;
		ctx.fill();
	}
	
}