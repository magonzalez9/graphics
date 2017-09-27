var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var uColor;       //  shader uniform variable for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var thetaY = -15;  // rotation around y axis
var viewMat;     // view matrix (will get to in Lab 4)
var stack = new MatrixStack(); 

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 0.7, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();        // set up shaders

    Shapes.initShapes();  // create the primitive shapes    

    render();              // Go draw the scene!

    window.onkeydown = function (event) {
        c = String.fromCharCode(event.keyCode);
      //alert(c);
        if (c == '&'){
        	Shapes.helicopter.yPos +=.07; 
        }

        if (c == '('){
        	Shapes.helicopter.yPos -=.07; 
        }

        if (c == '%'){
            Shapes.helicopter.xPos -=.07; 
        }


        if (c == "'"){
            Shapes.helicopter.xPos +=.07; 
        }
        if (c == 'A'){
            Shapes.helicopter.zPos +=.07; 
        }


        if (c == "S"){
            Shapes.helicopter.zPos -=.07; 
        }
    };
};
/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");   // we won't use vertex here
                            // colors but we keep it in for possible use later.
    
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

/**
 * Set the location and orientation of the camera. Compute 
 * the view and projection matrices, and set the value of the uniform
 * shader variable for the projection matrix.
 * @return {undefined}
 */
function cameraSetup() {
      // All of this is to get the camera set properly. We will 
    // learn about this in Lab 4
    thetaY += .2;  // increase rotation about chosen axis
    var eye = vec3(0.0, 4.0, 8.0);  // location of camera
    var at = vec3(0, 0, 0);         // what the camera is looking at (0,0,0)
    var up = vec3(0, 1, 0);         // the camera's up direction
    viewMat = lookAt(eye, at, up);  // view matrix
    var axisRot = rotateY(thetaY);  // rotation matrix for rotating around the y axis
    viewMat = mult(viewMat, axisRot); // combine the view matrix with rotation matrix
     
    // Calculate the projection matrix 
    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    // Set the value of the projection uniform variable in the shader
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat)); // set projection matrix
    
}

function render()
{
    Shapes.helicopter.pivotColumnTheta += 4; 

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    cameraSetup(); // computes viewMat
    stack.clear();  // clear the stack and place identity matrix on top [Ident]
    stack.multiply(viewMat); // stack is now: [viewMat]

    stack.push();
    Shapes.helicopter.draw(); 
    stack.pop(); 

    // stack.push();
    // stack.multiply(translate(5,0,0));
    // Shapes.helicopter.draw(); 
    // stack.pop(); 

    // Draw base
    stack.push();
    stack.multiply(translate(0,-1,0)); 
    stack.multiply(scalem(4,.1,4));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0, 0, .1, .6));  // set color to gray
    Shapes.drawPrimitive(Shapes.cube);  // draw blade
    stack.pop(); 

    requestAnimFrame(render);
   
}