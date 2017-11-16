var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal; 
var uColor;       // shader uniform variable location for color
var vTexCoords;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var program; 
var checkerboard; 
var stripes;
var fuzzy; 
var imageTexture; 
var uColorMode; 

var camera = new Camera(); 
var stack = new MatrixStack();
var lighting = new Lighting(); 


window.onload = function init()
{   
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
   
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0, 0, 0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

     checkerboard = new Checkerboard();
     stripes = new Stripes();
     fuzzy = new Fuzzy(); 
     imageTexture = new ImageTexture("textures/earth.jpg");
    
    shaderSetup();
    Shapes.initShapes();  // create the primitive and other shapes       
    lighting.setUp(); 

   render();
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    uColorMode = gl.getUniformLocation(program, "uColorMode");
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal"); // colors but we keep it in for possible use later.
    vTexCoords = gl.getAttribLocation(program, "vTexCoords");
   
    // get handles for shader uniform variables: 
    uTexture = gl.getUniformLocation(program, "uTexture");
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

    var newLight = mult(viewMat, lighting.light_position);
    gl.uniform4fv(uLight_position, newLight); 

    stack.clear();
    stack.multiply(viewMat);    
    
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.axis.draw();

    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0)); 
   
    //Draw Camera
    stack.push();
    stack.multiply(translate(lighting.light_position[0],lighting.light_position[1],lighting.light_position[2]));
    stack.multiply(scalem(.2,.2,.2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube); 
    stack.pop(); 

    

    //Earth
    stack.push();
    stack.multiply(translate(0,0,0)); 
     stack.multiply(scalem(5,5,5)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    imageTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

   

   
   
}

