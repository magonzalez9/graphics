/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global stack, Shapes, uModel_view, gl, uColor, z */
//Rachel Harvill Lab 3
//Lab partner: Dylan Mirashiro
var Gun = {};

function Gun () {
    this.name = "gun";
    this.pivotColumnTheta = 1;
}
Gun.draw = function (z) { //sending in z as a parameter allows me to draw multiple objects on the screen
    stack.push();
    stack.multiply(rotateY(this.pivotColumnTheta));
    stack.pop();
    drawBody(z); 
    drawBarrel(z);
    drawTrigger(z);
    drawGround();
};



function drawBody(z) {
    
    //draws top half of body 
    stack.push();
    stack.multiply(translate(0, 2, 0+z));
    stack.multiply(scalem(3, 1, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, .8, 1.0, 1.0));  // set color to blue
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    //draws bottom half of body
    stack.push();
    stack.multiply(translate(0, 1.5, 0+z));
    stack.multiply(scalem(3, .5, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, .8, 1.0, 1.0));  // set color to blue
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    //draws handle
    stack.push();
    stack.multiply(translate(-1, 1, 0+z));
    stack.multiply(scalem(1, 3, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, .8, 1.0, 1.0));  // set color to blue
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
 
    
};

function drawBarrel(z) {
       //draws part that bullet comes out of 
    stack.push();
    stack.multiply(rotateZ(90));
    stack.multiply(translate(-1.75, 1.5, 0+z));
    stack.multiply(scalem(.25, .25, .25));
    
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to blue
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop(); 
}

function drawTrigger(z) {
    stack.push();
    stack.multiply(translate(-.3, 1.1, 0+z));
    stack.multiply(scalem(.25, .25, .25));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to cyan
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
     //the following uses code that Dylan wrote so the
    stack.push();
    stack.multiply(rotateY(90));
    stack.multiply(translate(0+z, .75, 0));
    stack.multiply(scalem(.5, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to cyan
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    stack.push();
    stack.multiply(rotateY(90));
    stack.multiply(translate(0+z, .25, .5));
    stack.multiply(scalem(.5, .05, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to cyan
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();  
}

function drawBullet() {
    //draws bullet 
    stack.push(); //draws cone part of bullet
    for (i=0;i<100;i++) {
        stack.multiply(translate(i+1,0,0));
    }
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0, 0, 1.0));  // set color to black
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
    
}

function drawGround() {
    stack.push();
    stack.multiply(translate(0,-.75,0));
    stack.multiply(scalem(20,.05,20));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0, 0, 1.0));  // set color to black
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
}




