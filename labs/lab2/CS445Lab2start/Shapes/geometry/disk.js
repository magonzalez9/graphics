//Marco Gonzalez
//Lab Partner: Rachel Harvill
//September 12, 2017

function Disk(numDivisions) {

    this.name = "disk";
    this.numDivisions = numDivisions;
    this.numVertices = numDivisions *3;
    this.numTriangles = this.numDivisions;
    this.theta = (2 * Math.PI) / this.numDivisions;
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

    for (i = 0; i < this.numTriangles; i++) {
        currentAngle = this.theta * i;
        nextAngle = this.theta * (i+1);

        this.vertices[i*3] = vec4(0, 0, 0,1); // Center vertice
        this.vertices[i*3 + 1] = vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),1);
        this.vertices[i*3 + 2] = vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),1);

        //Set colors
        this.colors[i*3] = vec4(1.0,1.0,0.0,1);
        this.colors[i*3 + 1] = vec4(0.7,0.0, 1.0,1);
        this.colors[i*3 + 2] = vec4(0.1,1.0,0.6,1);
        
    }

    console.log(this.vertices);
    console.log(this.colors);
}