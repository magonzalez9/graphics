function Helicopter () {
	this.bladeLength = 1;
	this.bladeWidth = this.bladeLength/10;
	this.bladeHeight = this.bladeWidth/2;
	this.name = "helicopter"; 

	this.xPos = 0; 
	this.yPos = 2;
	this.zPos = 1; // or 1.1  
	//(w,h,l)

	this.pivotColumnTheta = 0; 

Helicopter.prototype.drawHelicopter = function(){
	stack.push();
	stack.multiply(rotateY(this.pivotColumnTheta));
	this.drawPivot(); 
	this.drawBlades(); 
	stack.pop();

	stack.push(); 
	this.drawBody();  
	stack.pop(); 


 

}

Helicopter.prototype.drawBlades = function(){
	stack.push();
    stack.multiply(translate(this.xPos,this.yPos,this.zPos)); 
    stack.multiply(scalem(this.bladeWidth,this.bladeHeight,this.bladeLength));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop(); 

    stack.push(); 
    stack.multiply(translate(this.xPos,this.yPos,-this.zPos));
    stack.multiply(scalem(this.bladeWidth,this.bladeHeight,this.bladeLength)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop();

    stack.push(); 
    stack.multiply(translate(-(this.xPos+1),this.yPos,this.zPos-1)); //here
    stack.multiply(scalem(this.bladeLength,this.bladeHeight,this.bladeWidth)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw cube
    stack.pop();

    stack.push(); 
    stack.multiply(translate((this.xPos+1),this.yPos,this.zPos-1));
    stack.multiply(scalem(this.bladeLength,this.bladeHeight,this.bladeWidth)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop();

}

Helicopter.prototype.drawPivot = function (){

    stack.push(); 
    stack.multiply(translate(this.xPos,this.yPos-.5,0));
    stack.multiply(scalem(.1,.5,.1)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw 
    stack.pop();

}

Helicopter.prototype.drawBody = function (){

    stack.push(); 
    stack.multiply(translate(this.xPos,this.yPos-1.3,0));
    stack.multiply(rotateX(90));
    stack.multiply(scalem(.8,.8,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1, 0, .1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw 
    stack.pop();

    stack.push()
    stack.multiply(translate(this.xPos,this.yPos-1.3,-1.1));
    stack.multiply(rotateX(90));
    stack.multiply(scalem(.8,.3,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1, 0, .1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw 
    stack.pop();


    stack.push()
    stack.multiply(translate(this.xPos,this.yPos-1.3, .9));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.8,.1,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1, 0, .1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw 
    stack.pop();

    stack.push()
    stack.multiply(translate(this.xPos,this.yPos-1.3, .9));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.15,1.25,.15)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1, 0, .1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw 
    stack.pop();

    stack.push()
    stack.multiply(translate(this.xPos,this.yPos-1.3, 2.17));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.15,.025,.15)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1, 0, .1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw 
    stack.pop();

    stack.push(); 
    stack.multiply(translate(this.xPos,this.yPos-1,2.05));
    stack.multiply(scalem(.075,.3,.075)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw 
    stack.pop();

}


}



