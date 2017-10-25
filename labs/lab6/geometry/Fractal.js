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



Fractal.prototype.calcNormal = function(i, j){
var vOne = vec4(2*scale,f.getH(i+1,j)-f.getH(i-1,j),0,0);
var vTwo = vec4(0,f.getH(i,j+1)-f.getH(i,j-1),2*scale,0);

var v = vec4(normalize(cross(vTwo,vOne)),0);
return v;  

}

Fractal.prototype.getColor = function(height){
	//console.log(height);
	var c1 = vec4(0.0, 0.0, 1.0, 1.0); //blue
	var c2 = vec4(0.0, 1.0, 0.0, 1.0); //green
	var c3 = vec4(0.8, 0.3, 0.3, 1.0);//brown
	var c4 = vec4(1.0, 1.0, 1.0, 1.0);//white
	if (height == 0.0){
		return c1;
	}else if (height < 0.1){
		return c4;
	}else if (height <0.5){
		return c2;
	}else if(height < 0.8){
		return c3;
	}else{
		return c4;
	}
}

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

	    this.colors.push(this.getColor(f.getH(i+1, j+1)));
	    this.colors.push(this.getColor(f.getH(i+1, j)));
	    this.colors.push(this.getColor(f.getH(i,j)));

	    this.colors.push(this.getColor(f.getH(i,j)));
	    this.colors.push(this.getColor(f.getH(i,j+1)));
	    this.colors.push(this.getColor(f.getH(i+1, j+1)));


	}
}
  
}
