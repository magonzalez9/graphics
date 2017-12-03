/* global WebGLUtils, Lighting, Shapes, uLight_position */
//Lab 5: Rachel Harvill

var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;      // shader variable attrib location for normals
var uColor;       // shader uniform variable location for color
var uTexture;
var uColorMode; 
var vTexCoords;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var program;
var lighting = new Lighting();
var camera = new Camera(); 
var stack = new MatrixStack();
var checkerboard;
var imageTexture;
var marsTexture;
var mercuryTexture;
var jupiterTexture;
var uranusTexture;
var neptuneTexture;
var earthTexture;
var venusTexture;
var sunTexture;
var saturnTexture;
var saturnRing;
var stripes;
var fuzzy;
var ringTexture;
var uranusRing;



window.onload = function init()
{   
    //set Event Handlers
   // setKeyEventHandler();
   // setMouseEventHandler();
   // setSliderEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
    
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
 
    gl.viewport( 0, 0, canvas.width, canvas.height );
//    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    
    gl.enable(gl.DEPTH_TEST);
 
    checkerboard = new Checkerboard();
    starsTexture = new ImageTexture("textures/stars.jpg");
    imageTexture = new ImageTexture("textures/test.jpg");;
    marsTexture = new ImageTexture("textures/marsTexture.png");
    mercuryTexture = new ImageTexture("textures/download.png");
    jupiterTexture = new ImageTexture("textures/jupiterTexture.png");
    uranusTexture = new ImageTexture("textures/uranusTexture.png");
    neptuneTexture = new ImageTexture("textures/neptuneTexture.png");
    saturnTexture = new ImageTexture("textures/saturn.png");
    earthTexture = new ImageTexture("textures/earthTexture.png");
    venusTexture = new ImageTexture("textures/venusTexture.png");
    sunTexture = new ImageTexture("textures/sunTexture.png");
    uranusRing = new ImageTexture("textures/uranusRing.png");
    saturnRing = new ImageTexture("textures/saturnRing.png");
    stripes = new Stripes();
    fuzzy = new Fuzzy();
    
    //  Load shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    lighting.setUp();
    shaderSetup();
  
    
    Shapes.initShapes();  // create the primitive and other shapes       
    
    render();
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
   // var program = initShaders(gl, "vertex-shader", "fragment-shader", "normal-shader");
   // gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    uColorMode =  gl.getUniformLocation(program, "uColorMode");
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
                            // colors but we keep it in for possible use later.
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoords = gl.getAttribLocation(program, "vTexCoords");
   
    // get handles for shader uniform variables: 
    uTexture =  gl.getUniformLocation(program, "uTexture");
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    
    var viewMat = camera.calcViewMat();   // View matrix

    var light = mult(viewMat, lighting.light_position);
    gl.uniform4fv(uLight_position, light);
    stack.clear();
    stack.multiply(viewMat);
    
    // Need these 2 lines since camera is sitting at origin. 
    // Without them, you would be sitting inside the cube.
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    
    
//    Shapes.axis.draw();
    
     gl.uniform4fv(uColor, vec4(1.0, 0.7, 0.8, 1.0));
     
    
    stack.push();
    stack.multiply(translate(0,0,0)); 
    stack.multiply(scalem(5,5,5)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    sunTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sun);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-7.5,0,-2.5));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    mercuryTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(scalem(1,1,1));
    stack.multiply(translate(5,0,16));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    marsTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-5,0,12)); 
    stack.multiply(scalem(2,2,2)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    earthTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-50,0,-50));
    stack.multiply(scalem(5,5,5));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    jupiterTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(40,0,-40)); 
    stack.multiply(scalem(3,3,3)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    saturnTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(40,0,-40)); 
    stack.multiply(scalem(4,4,4)); 
    gl.uniform1i(uColorMode,1);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    saturnRing.activate(); 
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-25,0,0));
    stack.multiply(scalem(2,2,2));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    uranusTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    stack.push();
    stack.multiply(translate(-25,0,0));
    stack.multiply(scalem(4,4,4));
    gl.uniform1i(uColorMode,1);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    uranusRing.activate(); 
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(30,0,-5));
    stack.multiply(scalem(2,2,2));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    neptuneTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(9.5,0,0)); 
    stack.multiply(scalem(1.5,1.5,1.5)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    venusTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    // stack.push();
    // stack.multiply(translate(0,0,0)); 
    // stack.multiply(scalem(20,20,20)); 
    // gl.uniform1i(uColorMode,2);
    // gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    // starsTexture.activate(); 
    // Shapes.drawPrimitive(Shapes.sphere);
    // stack.pop();

 


//    
//     stack.push();
//    stack.multiply(translate(-12,0,-10));
//    stack.multiply(scalem(3,3,3));
//    gl.uniform1i(uColorMode,1);
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    uranusRing.activate(); 
//    Shapes.drawPrimitive(Shapes.disk);
//    stack.pop();
    

    
    
    
    
   
}

