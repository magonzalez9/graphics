//Marco Gonzalez
//Lab Partner: Rachel Harvill
//September 12, 2017

function Cylinder() {

    this.name = "cylinder";
    this.numDivisions = 20; //number of triangles
    this.numVertices = 240; // number of vertices (corners)
    this.numTriangles = this.numDivisions;
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

        //Bottom disk
        this.vertices.push(vec4(0, -1, 0,1)); // Center vertice
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        //Connect triangles
        this.vertices.push(vec4(Math.cos(currentAngle), 1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));

        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

         //Set colors
        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));

        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));
        
    }

}