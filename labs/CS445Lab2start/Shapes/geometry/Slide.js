var Slide = {};

Slide.draw = function (z) {
    slideR(z);
    slideL(z);
    slideB(z);
    slideF(z);
    slideT(z);
    slideBottom();
    barrel();
    slideCover();
};

function slideR(z) {
    stack.push();
    stack.multiply(translate(.5, 2, 1.375 + z));
    stack.multiply(scalem(0.05, 1, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(.5, 1.75, 0 + z));
    stack.multiply(scalem(0.05, .5, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(.5, 2, -1.375 + z));
    stack.multiply(scalem(0.05, 1, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideL(z) {
    stack.push();
    stack.multiply(translate(-.5, 2, 0 + z));
    stack.multiply(scalem(0.05, 1, 4.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}
function slideB(z) {
    stack.push();
    stack.multiply(translate(0, 2, -2.25 + z));
    stack.multiply(scalem(1, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideF(z) {
    stack.push();
    stack.multiply(translate(0, 2, 2.25 + z));
    stack.multiply(scalem(1, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideT(z) {
    stack.push();
    stack.multiply(translate(0, 2.5, 1.375 + z));
    stack.multiply(scalem(1, .05, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(-.25, 2.5, 0 + z));
    stack.multiply(scalem(0.5, .05, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 2.5, -1.375 + z));
    stack.multiply(scalem(1, .05, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideCover() {
    stack.push();
    stack.multiply(translate(0, 2, 0));
    stack.multiply(scalem(1, 1, 1.25));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, .8, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

//function slideBottom() {
//    stack.push();
//    stack.multiply(translate(0, 1.25, 1));
//    stack.multiply(scalem(, .25, 1));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    gl.uniform4fv(uColor, vec4(0, 0, .25, 1));
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();
//}

function barrel() {
    stack.push();
    stack.multiply(translate(0, 2, -2.7));
    stack.multiply(scalem(.25, .25, 4.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
}



