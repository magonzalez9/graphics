function Helicopter () {


Helicopter.prototype.drawHelicopter = function(){
	stack.clear();  // clear the stack and place identity matrix on top [Ident]
    stack.multiply(viewMat); // stack is now: [viewMat]
  

    

}

Helicopter.prototype.drawBlade = function(){
	stack.push();
    stack.multiply(translate(1.5,3,1)); // multiply top of stack by translate on right [viewMat*translate]
    stack.multiply(scalem(.1,.05,1)); // multiply top of stack by scale on right [viewMat*translate*scale]
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);  // draw cube
    stack.pop(); 

}

Helicopter.prototype.drawBody = function (){

}


}



