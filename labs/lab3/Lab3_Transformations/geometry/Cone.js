//Marco Gonzalez

function Cone(numDivisions) {

  this.name = "cone";
    this.numDivisions = numDivisions; //number of triangles
    this.numVertices = numDivisions*12; // number of vertices (corners)
    this.numTriangles = 3 * this.numDivisions;
    this.theta = (2 * Math.PI) / this.numDivisions;
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

   for (i = 0; i < this.numTriangles*3; i++) {
        currentAngle = this.theta * i;
        nextAngle = this.theta * (i+1);

        //Bottom Disk
        this.vertices.push(vec4(0, -1, 0,1)); // Center vertice
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        //Set colors
        this.colors.push(vec4(1.0,1.0,0.0,1));
        this.colors.push(vec4(0.7,0.0, 1.0,1));
        this.colors.push(vec4(0.1,1.0,0.6,1));

        //Top disk
       this.vertices.push(vec4(0, 2, 0,1)); // Center vertice


       this.colors.push(vec4(0.0,0.0,0.0,1));   
    }

    console.log(this.vertices);
    console.log(this.colors);
}