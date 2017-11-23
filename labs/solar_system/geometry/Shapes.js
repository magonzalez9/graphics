/** Build and Draw Primitive Shapes
 * 
 * Global Variables:
 *   gl: the webgl graphics context.
 *   vPosition: shader variable location for vertex position attribute
 *   vColor: shader variable location for color attribute
 */

var Shapes = {};   // set up Shapes namespace

Shapes.cube = new Cube();  
Shapes.sphere = new Sphere(776); 
Shapes.axis = new Axis();
Shapes.cylinder = new Cylinder(20); 
Shapes.disk = new Disk(20); 
Shapes.cone = new Cone(20); 
Shapes.helicopter = new Helicopter();// TO DO: ADD OTHER SHAPES

Shapes.initShapes = function () {
     Shapes.initBuffers(Shapes.cube);
     Shapes.initBuffers(Shapes.cylinder);
     Shapes.initBuffers(Shapes.sphere);
     Shapes.initBuffers(Shapes.disk);
     Shapes.initBuffers(Shapes.cone); 
   
    // TO DO: ADD OTHER SHAPES 
    Shapes.axis.initBuffer();
};


Shapes.initBuffers = function (primitive) {

    // SET UP ARRAY BUFFER FOR VERTICES 
    ////////////////////////////////////////////////////////////
    primitive.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.vertices), gl.STATIC_DRAW); //Send to GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer 


    // SET UP ARRAY BUFFER FOR VERTEX COLORS 
    ////////////////////////////////////////////////////////////
    primitive.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    //Add Vertex Buffers for Normals
    primitive.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.normals), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffers

    primitive.texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.texCoords), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffers
}

//
Shapes.drawPrimitive = function (primitive) {

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    //Bind buffer form normal
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normalBuffer);
    gl.enableVertexAttribArray(vNormal);
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);

    //Bind buffer for texCoords
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.texBuffer);
    gl.enableVertexAttribArray(vTexCoords);
    gl.vertexAttribPointer(vTexCoords, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, primitive.numVertices);

    gl.disableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.disableVertexAttribArray(vNormal); 
    gl.disableVertexAttribArray(vTexCoords); 


    gl.bindBuffer(gl.ARRAY_BUFFER, null);

};





