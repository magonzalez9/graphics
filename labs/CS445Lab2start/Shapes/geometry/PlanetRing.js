//Marco Gonzalez
//Lab Partner: Rachel Harvill
//September 12, 2017

function PlanetRing(numDivisions) {

    this.name = "planetRing";
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
        this.normals[i*3] = vec4(0,1,0,0); 
        this.texCoords[i*3] = vec2(0.5,0.5); 

        this.vertices[i*3 + 1] = vec4(Math.cos(currentAngle), 0, (Math.sin(currentAngle))/2,1);
        this.normals[i*3 + 1] = vec4(0,1,0,0); 
        this.texCoords[i*3 +1] = vec2(.5*Math.cos(currentAngle)+0.5, .5*((Math.sin(currentAngle))/2)+0.5);

        this.vertices[i*3 + 2] = vec4(Math.cos(nextAngle), 0, (Math.sin(nextAngle))/2,1);
        this.normals[i*3 +2] = vec4(0,1,0,0);
        this.texCoords[i*3 +2] = vec2(.5*Math.cos(nextAngle)+0.5, .5*((Math.sin(nextAngle))/2)+0.5);



        //Set colors
        this.colors[i*3] = vec4(1.0,1.0,0.0,1);
        this.colors[i*3 + 1] = vec4(0.7,0.0, 1.0,1);
        this.colors[i*3 + 2] = vec4(0.1,1.0,0.6,1);
        
    }

    console.log(this.vertices);
    console.log(this.colors);
}



