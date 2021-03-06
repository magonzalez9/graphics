//Marco Gonzalez
//Lab Partner: Dolan Miyashiro
//September 12, 2017

function Cylinder(numDivisions) {

   this.name = "cylinder";
    this.numDivisions = numDivisions; //number of triangles
    this.numVertices = 12 * numDivisions; // number of vertices (corners)
    this.numTriangles = 4 * this.numDivisions;
    this.theta = (2 * Math.PI) / this.numDivisions;
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

   for (i = 0; i < this.numTriangles*3; i++) {
        currentAngle = this.theta * i;
        nextAngle = this.theta * (i+1);

        //Top Disk
        this.vertices.push(vec4(0, 1, 0,1)); // Center vertice
        this.vertices.push(vec4(Math.cos(currentAngle), 1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));

        this.normals.push(vec4(0,1,0,0)); 
        this.normals.push(vec4(0,1,0,0));
        this.normals.push(vec4(0,1,0,0)); 

        /* texCoords */
        this.texCoords.push(vec2(0.5,0.5));
        this.texCoords.push(vec2(.5*Math.cos(currentAngle)+0.5, .5*Math.sin(currentAngle)+0.5));
        this.texCoords.push(vec2(.5*Math.cos(nextAngle)+0.5, .5*Math.sin(nextAngle)+0.5));


        //Bottom disk
        this.vertices.push(vec4(0, -1, 0,1)); // Center vertice
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        this.normals.push(vec4(0,-1,0,0)); 
        this.normals.push(vec4(0,-1,0,0));
        this.normals.push(vec4(0,-1,0,0)); 

        /* texCoords */
        this.texCoords.push(vec2(0.5,0.5));
        this.texCoords.push(vec2(Math.cos(currentAngle)+0.5, Math.sin(currentAngle)+0.5));
        this.texCoords.push(vec2(Math.cos(nextAngle)+0.5, Math.sin(nextAngle)+0.5));

        //Connect triangles
        this.vertices.push(vec4(Math.cos(currentAngle), 1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));

        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0)); 

        /* texCoords */
        this.texCoords.push(vec2(0,currentAngle/(Math.PI*2))); 
        this.texCoords.push(vec2(1,currentAngle/(Math.PI*2))); 
        this.texCoords.push(vec2(1,nextAngle/(Math.PI*2))); 


        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0)); 

        /* texCoords */
        this.texCoords.push(vec2(0,currentAngle/(Math.PI*2))); 
        this.texCoords.push(vec2(1,nextAngle/(Math.PI*2))); 
        this.texCoords.push(vec2(0,nextAngle/(Math.PI*2))); 

         //Set colors
        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));

        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));
        
    }

}