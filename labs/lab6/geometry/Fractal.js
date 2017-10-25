//Marco Gonzalez
//October 16, 2017

function Fractal() {

    var size = 8; 
    var f = new FractalDEM(size); 

    this.name = "fractal";
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];
    this.numVertices = f.gridSize*f.gridSize*6; 
    var scale =6/f.gridSize; 

for (i = 0; i < f.gridSize; i++){


	for (j = 0; j < f.gridSize; j++){
		this.vertices.push((i+1)*scale, f.getH(i+1, j+1), (j+1)*scale,1); 
		this.vertices.push((i+1)*scale, f.getH(i+1, j), j*scale,1); 
		this.vertices.push(i*scale, f.getH(i,j), j*scale,1); 
		

	    this.vertices.push(i*scale, f.getH(i,j), j*scale,1); 
	    this.vertices.push(i*scale, f.getH(i,j+1), (j+1)*scale,1);
	    this.vertices.push((i+1)*scale, f.getH(i+1, j+1), (j+1)*scale,1); 

	    this.normals.push(this.calcNormal(i+1, j+1));
	    this.normals.push(this.calcNormal(i+1, j));
	    this.normals.push(this.calcNormal(i,j));

	    this.normals.push(this.calcNormal(i,j));
	    this.normals.push(this.calcNormal(i,j+1));
	    this.normals.push(this.calcNormal(i+1, j+1));

	    this.colors.push(.7, .3, 1, 1.0);
	    this.colors.push(.7, .3, 1, 1.0);
	    this.colors.push(.7, .3, 1, 1.0);
	    this.colors.push(.7, .3, 1, 1.0);
	    this.colors.push(.7, .3, 1, 1.0);
	    this.colors.push(.7, .3, 1, 1.0);


	}
}

Fractal.prototype.calcNormal = function(i, j){
var vOne = vec4(2*scale,f.getH(i+1,j)-f.getH(i-1,j),0,0);
var vTwo = vec4(0,f.getH(i,j+1)-f.getH(i,j-1),2*scale,0);

var v = vec4(normalize(cross(vOne,vTwo)),0);
return negate(v);  

}

function getColor(){
	return vec4(.7, .3, 1, 1.0);
}
  
}