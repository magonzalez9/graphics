var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;', //Add color
'varying vec3 fragColor;',
'',
'void main ()',
'{', 
'fragColor = vertColor;',
              //x,y = vertPosition, z = 0.0
' gl_Position = vec4(vertPosition, 0.0,1.0);',
'}'
].join('\n');

var fragmentShaderText = 
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
' gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n'); 

window.onload = function(){
	console.log("this is working");

	var canvas = document.getElementById('myCanvas');
	var gl = canvas.getContext('webgl1');

	if (!gl) {
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert("Browser does not support WebGL");
	}

	// Set canvas color
	gl.clearColor(0.75,0.85,0.8,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Create shader objects
	var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	// Get source of where shader code lives
	gl.shaderSource(vertexShader, vertexShaderText); 
	gl.shaderSource(fragmentShader, fragmentShaderText);

	// Compile vertex shader
	gl.compileShader(vertexShader); 

	//Check for vertex shader errors 
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return; 
	}

	//Compile fragment shader
	gl.compileShader(fragmentShader); 

	//Check for fragment shader errors
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.error('ERROR compiling fragmentShader shader!', gl.getShaderInfoLog(fragmentShader));
		return; 
	}

	var program = gl.createProgram(); 
	gl.attachShader(program, vertexShader); 
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program); 

	//Create buffer
	var triangleVertices = 
	[ //X,y			R, G, B (vec3)
		 0.0,0.7,	1.0,1.0,0.0,
		-0.7,-0.5,  0.7,0.0, 1.0,
		 0.7, -0.5, 0.1,1.0,0.6

	];

	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject); 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor'); 

	gl.vertexAttribPointer(
		positionAttribLocation,
		2, //Number of Elements per attribute
		gl.FLOAT,
		gl.FALSE, 
		5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
		0 // offset from the beginning of a single vertex to this attribute
		);

	gl.vertexAttribPointer(
		colorAttribLocation,
		3, //Number of Elements per attribute
		gl.FLOAT,
		gl.FALSE, 
		5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT// offset from the beginning of a single vertex to this attribute
		);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3); 





}