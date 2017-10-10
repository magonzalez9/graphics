function Helicopter () {
    //Blade properties
	this.bladeLength = 1;
	this.bladeWidth = this.bladeLength/10;
	this.bladeHeight = this.bladeWidth/2;
	this.name = "helicopter"; 

    //Helicopter Position
	this.xPos = 0; 
	this.yPos = 0;
	this.zPos = 1; 

	this.pivotColumnTheta = 2; 
}
Helicopter.prototype.draw = function(){
   stack.push(); 
   stack.multiply(translate(this.xPos,this.yPos,this.zPos));
   this.drawHelicopter();
   stack.pop(); 
}

Helicopter.prototype.drawHelicopter = function(){
	stack.push();
    stack.multiply(rotateY(this.pivotColumnTheta));
    this.drawBlades();
    this.drawPivot(); 
	stack.pop();

	stack.push(); 
    this.drawTail(); 
	this.drawBody();  
	stack.pop();
}

Helicopter.prototype.drawBlades = function(){
	stack.push();
    stack.multiply(translate(0,this.bladeHeight+1.35,this.bladeLength+.1)); 
    stack.multiply(scalem(this.bladeWidth,this.bladeHeight,this.bladeLength));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop(); 

    stack.push(); 
    stack.multiply(translate(0,1.4,-1.1));
    stack.multiply(scalem(this.bladeWidth,this.bladeHeight,this.bladeLength)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop();

    stack.push(); 
    stack.multiply(translate(-1.1,1.4,0)); //here
    stack.multiply(scalem(this.bladeLength,this.bladeHeight,this.bladeWidth)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop();

    stack.push(); 
    stack.multiply(translate(1.1,1.4,0));
    stack.multiply(scalem(this.bladeLength,this.bladeHeight,this.bladeWidth)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop();

}

Helicopter.prototype.drawPivot = function (){
    //Draw pivot
    stack.push(); 
    stack.multiply(translate(0,.95,0));
    stack.multiply(scalem(.1,.5,.1)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to gray
    Shapes.drawPrimitive(Shapes.cylinder);  // draw Pivot
    stack.pop();

}

Helicopter.prototype.drawBody = function (){

    stack.push(); 
    stack.multiply(translate(0,0,0));
    stack.multiply(rotateX(90));
    stack.multiply(scalem(.8,.8,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .9));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw main body
    stack.pop();

    stack.push()
    stack.multiply(translate(0,0,-1.1));
    stack.multiply(rotateX(90));
    stack.multiply(scalem(.8,.3,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw front of body
    stack.pop(); 

    stack.push()
    stack.multiply(translate(0,0, 1-.1));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.8,.1,.8)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .9));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw back of body
    stack.pop();

}


Helicopter.prototype.drawTail = function (){
    //Tail pipe
    stack.push()
    stack.multiply(translate(0,0, 1));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.15,1.25,.15)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .9)); // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw tail pipe
    stack.pop();

    //End of tail pipe
    stack.push()
    stack.multiply(translate(0,0, 2.29));
    stack.multiply(rotateX(-90));
    stack.multiply(scalem(.15,.025,.15)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .9));  // set color to red
    Shapes.drawPrimitive(Shapes.cone);  // draw back of tail pipe
    stack.pop();

    //Top of tail pipe
    stack.push(); 
    stack.multiply(translate(0,.3,2.05));
    stack.multiply(scalem(.075,.2,.075)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .3));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw tope tail pipe
    stack.pop();

    //Back Rotors
    stack.push(); 
    stack.multiply(translate(0,.75,2.05));
    stack.multiply(rotateX(this.pivotColumnTheta));
    stack.multiply(rotateZ(-90));
    stack.multiply(scalem(.25,.05,.25)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0,0,0.1,.3));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw back rotors
    stack.pop();

}


