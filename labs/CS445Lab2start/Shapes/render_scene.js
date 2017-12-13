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
var ringTexture;
var uranusRing;

var rotateTheta = 0;
var marsTheta = 0;
var jupiterTheta = 0;
var jupiterRotateTheta = 0;
var neptuneRotateSpeed = 0;
var uranusRotateSpeed =0;
var mercuryRotateSpeed =0;
var venusRotateSpeed =0;
var marsRotateSpeed=0;
var saturnRotateSpeed =0;
var earthRotationPeriod = 0;
var mercuryRotationPeriod = 0;
var venusRotationPeriod =0;
var marsRotationPeriod =0;
var jupiterRotationPeriod=0;
var saturnRotationPeriod=0;
var uranusRotationPeriod=0;
var neptuneRotationPeriod=0;

var earthXPosition;
var earthYPosition;
var earthZPosition;

var marsXPosition;
var marsYPosition;
var marsZPosition;

var jupiterXPosition;
var jupiterYPosition;
var jupiterZPosition;

var mercuryXPosition;
var mercuryYPosition;
var mercuryZPosition;

var saturnYPosition;
var saturnXPosition;
var saturnZPosition;

var uranusXPosition;
var uranusYPosition;
var uranusZPosition;

var neptuneXPosition;
var neptuneYPosition;
var neptuneZPosition;

var venusXPosition;
var venusYPosition;
var venusZPosition;

var mercuryThetaVal = .005;
var earthThetaVal = .00304878;
var marsThetaVal = .002512563;
var jupiterThetaVal = .00136612;
var saturnThetaVal = .001077586;
var uranusThetaVal = .0009;
var neptuneThetaVal = .0001;
var venusThetaVal = .00297619;

// alert('hello');
window.onload = function init()
{   
    //set Event Handlers
   setKeyEventHandler();
   setMouseEventHandler();
   // setSliderEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
    
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
 
    gl.viewport( 0, 0, canvas.width, canvas.height );
//    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    
    gl.enable(gl.DEPTH_TEST);
 
    checkerboard = new Checkerboard();
    starsTexture = new ImageTexture("textures/stars2.jpg");
    imageTexture = new ImageTexture("textures/test.jpg");;
    marsTexture = new ImageTexture("textures/marsTexture.png");
    mercuryTexture = new ImageTexture("textures/mercuryTexture.jpg");
    jupiterTexture = new ImageTexture("textures/jupiterTexture.png");
    uranusTexture = new ImageTexture("textures/uranusTexture.png");
    neptuneTexture = new ImageTexture("textures/neptuneTexture.png");
    saturnTexture = new ImageTexture("textures/saturn.png");
    earthTexture = new ImageTexture("textures/earthTexture.png");
    venusTexture = new ImageTexture("textures/venusTexture.png");
    sunTexture = new ImageTexture("textures/sunTexture.png");
    uranusRing = new ImageTexture("textures/uranusRing.png");
    saturnRing = new ImageTexture("textures/saturnRing.png");
    ringTexture = new ImageTexture("textures/rings.png");
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
    
    
     gl.uniform4fv(uColor, vec4(1.0, 0.7, 0.8, 1.0));
    

    marsTheta += marsThetaVal;
    rotateTheta += earthThetaVal;
    jupiterRotateTheta += jupiterThetaVal;
    neptuneRotateSpeed += neptuneThetaVal;
    uranusRotateSpeed += uranusThetaVal;
    mercuryRotateSpeed += mercuryThetaVal;
    venusRotateSpeed += venusThetaVal;
    marsRotateSpeed += marsThetaVal;
    saturnRotateSpeed += saturnThetaVal;

    earthRotationPeriod+= .1;
    mercuryRotationPeriod += .0172462;
    venusRotationPeriod += .0041149;
    marsRotationPeriod += .102;
    jupiterRotationPeriod += .241;
    saturnRotationPeriod += .227117874;
    uranusRotationPeriod+= -.139211783;
    neptuneRotationPeriod+= .14897;
    
    stack.push();
    stack.multiply(translate(0,0,0)); 
    stack.multiply(scalem(30,30,30));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    sunTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sun);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(35*Math.cos(mercuryRotateSpeed),0,35*Math.sin(mercuryRotateSpeed)));
    mercuryXPosition = 35*Math.cos(mercuryRotateSpeed);
    mercuryYPosition= 0;
    mercuryZPosition= 35*Math.sin(mercuryRotateSpeed);
    stack.multiply(rotateY(mercuryRotationPeriod));
    stack.multiply(scalem(.5,.5,.5));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    mercuryTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    stack.push();
    stack.multiply(translate(45*Math.cos(venusRotateSpeed),0,45*Math.sin(venusRotateSpeed)));
    venusXPosition = 45*Math.cos(venusRotateSpeed);
    venusYPosition= 0;
    venusZPosition= 45*Math.sin(venusRotateSpeed);
    stack.multiply(rotateY(venusRotationPeriod));
    stack.multiply(scalem(1.2,1.2,1.2)); 
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    venusTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    stack.push(); 
    stack.multiply(translate(53*Math.cos(rotateTheta),0,53*Math.sin(rotateTheta)));
    earthXPosition = 53*Math.cos(rotateTheta);
    earthYPosition= 0;
    earthZPosition= 53*Math.sin(rotateTheta);
    stack.multiply(rotateY(earthRotationPeriod));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    earthTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(62*Math.cos(marsRotateSpeed),0,62*Math.sin(marsRotateSpeed)));
    marsXPosition = 62*Math.cos(marsRotateSpeed);
    marsZPosition = 62*Math.sin(marsRotateSpeed);
    stack.multiply(rotateY(marsRotationPeriod));
    stack.multiply(scalem(.7,.7,.7));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    marsTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(100*Math.cos(jupiterRotateTheta),0,100*Math.sin(jupiterRotateTheta)));
    jupiterXPosition = 100*Math.cos(jupiterRotateTheta);
    jupiterYPosition = 0;
    jupiterZPosition = 100*Math.sin(jupiterRotateTheta);
    stack.multiply(rotateY(jupiterRotationPeriod)); 
    stack.multiply(scalem(11,11,11));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    jupiterTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push(); 
    stack.multiply(translate(150*Math.cos(saturnRotateSpeed),0,150*Math.sin(saturnRotateSpeed)));
    saturnXPosition = 150*Math.cos(saturnRotateSpeed);
    saturnYPosition= 0;
    saturnZPosition= 150*Math.sin(saturnRotateSpeed);
    stack.multiply(rotateY(saturnRotationPeriod));
    // gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    // saturnTexture.activate(); 
    Shapes.uranus.draw();
    stack.pop();
    
    stack.push();
    stack.multiply(translate(200*Math.cos(uranusRotateSpeed),0,200*Math.sin(uranusRotateSpeed)));
    uranusXPosition = 200*Math.cos(uranusRotateSpeed);
    uranusYPosition= 0;
    uranusZPosition= 200*Math.sin(uranusRotateSpeed);
    stack.multiply(rotateZ(uranusRotationPeriod));
    stack.multiply(scalem(4,4,4));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    uranusTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(250*Math.cos(neptuneRotateSpeed),0,250*Math.sin(neptuneRotateSpeed)));
    neptuneXPosition = 250*Math.cos(neptuneRotateSpeed);
    neptuneYPosition= 0;
    neptuneZPosition= 250*Math.sin(neptuneRotateSpeed);
    stack.multiply(rotateY(neptuneRotationPeriod));
    stack.multiply(scalem(3.8,3.8,3.8));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    neptuneTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    stack.push();
    stack.multiply(translate(0,0,0)); 
    stack.multiply(scalem(300,300,300));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    starsTexture.activate(); 
    Shapes.drawPrimitive(Shapes.sun);
    stack.pop();
    

    
    
    requestAnimFrame(render);

    
    
    
    
   
}

