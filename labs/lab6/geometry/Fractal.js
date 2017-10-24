//Marco Gonzalez
//October 16, 2017

function Fractal() {

    var size = 4; 
    var f = new FractalDEM(size); 

    this.name = "fractal";
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];
    this.numVertices = f.gridSize*f.gridSize*6; 
    var scale =3/size; 

for (i = 0; i < f.gridSize; i++){


	for (j = 0; j < f.gridSize; j++){
		this.vertices.push((i+1)*scale, f.getH(i+1, j+1), (j+1)*scale,1); 
		this.vertices.push((i+1)*scale, f.getH(i+1, j), j*scale,1); 
		this.vertices.push(i*scale, f.getH(i,j), j*scale,1); 
		

	    this.vertices.push(i*scale, f.getH(i,j), j*scale,1); 
	    this.vertices.push(i*scale, f.getH(i,j+1), (j+1)*scale,1);
	    this.vertices.push((i+1)*scale, f.getH(i+1, j+1), (j+1)*scale,1); 

	    this.normals.push(calcNormal(i,j));
	    this.normals.push(calcNormal(i,j));
	    this.normals.push(calcNormal(i,j));

	    this.normals.push(calcNormal(i,j));
	    this.normals.push(calcNormal(i,j));
	    this.normals.push(calcNormal(i,j));

	    this.colors.push(1.0, 1.0, 0.0, 1.0);
	    this.colors.push(1.0, 1.0, 0.0, 1.0);
	    this.colors.push(1.0, 1.0, 0.0, 1.0);

	    this.colors.push(1.0, 1.0, 0.0, 1.0);
	    this.colors.push(1.0, 1.0, 0.0, 1.0);
	    this.colors.push(1.0, 1.0, 0.0, 1.0);


	}
}

function calcNormal(i, j){
var vOne = vec4(i+1,f.getH(i,j),j,1);
var vTwo = vec4(i, f.getH(i,j),j+1,1);

var v = vec4(normalize(cross(vOne,vTwo)),1);
return v;  


}
  
}