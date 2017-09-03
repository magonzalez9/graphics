// Array where all circle objects will be stored.
info = [];

//Class: Circle
//Description:
//Params: 
function Circle(event) {
	canvas = document.getElementById("myCanvas");
    circle = canvas.getContext("2d");
	var pos = getMousePos(canvas, event);

	this.x = pos.x;
	this.y = pos.y;
	this.radius = Math.floor((Math.random() * 30) + 10);
}

//Function: generateCircle
//Description: generates the circle to be created on the canvas. 
//Params: none
//Returns: none
Circle.prototype.generateCircle = function() {
	//Generate Circle
	circle.beginPath();
	circle.arc(this.x,this.y,this.radius,0,2*Math.PI);
	circle.stroke();
	circle.closePath(); 

}

//Function: draw
//Description: Draws circle onto canvas and adds the circle object to info array. 
//Params: event
//Returns: none
function draw(event){
    circleObj = new Circle(event);
    info.push(circleObj);  
	circleObj.generateCircle(); 

	document.getElementById("circleDescription").innerHTML = "X POS: " + Math.round(circleObj.x) + "<br>" + 
															 "Y POS: " + Math.round(circleObj.y) + "<br>"+ 
															 "Radius: " + circleObj.radius + "<br>" +
															 "Circles Created: " + info.length; 

	
}

//Function: colorCircle
//Description: Assigns a random fill color to the existing circles
//Params: none
//Returns: none
function colorCircle(){
	for (var i = 0; i < info.length; i++) {
		circle.beginPath();
		circle.arc(info[i].x, info[i].y, info[i].radius,0,2*Math.PI);
		circle.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);;
		circle.fill();
	}
	
}

//Function getMousePos()
//Description: Gets the position of the mouse on the html canvas
//Params: canvas, event
//Returns: coordinates
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function clear (canvas, event){
	
	circle.clearRect(0, 0, canvas.width, canvas.height);
}
