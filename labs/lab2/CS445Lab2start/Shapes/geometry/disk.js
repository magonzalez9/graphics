///// CUBE DEFINTION
/////
///// Cube is defined to be centered at the origin of the coordinate reference system. 
///// Cube size is assumed to be 2.0 x 2.0 x 2.0 .

///// Generate 12 triangles: 36 vertices and 36 colors
/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z
///// Always use the Right Hand Rule to generate vertex sequence. We want outward facing normals.
function Disk() {

  

    this.name = "disk";
    this.numDivisions = 8; 
    this.numVertices = 36;
    this.numTriangles = this.numDivisions;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];

      //Math stuff
    this.theta = (2*Math.PI)/this.numDivisions; 

    // Local variables: unique vertices and colors.
    //////////////////////////////////////////////////////////////
    //for (i = 0; i < this.numTriangles; i++){
        this.texCoords[0] = (vec4(1,0,.5,1.0))
         this.colors[0] = (1,1,1,1)

        
    //}
}