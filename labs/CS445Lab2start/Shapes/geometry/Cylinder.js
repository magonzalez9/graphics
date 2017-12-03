/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Rachel Harvill
//September 12, 2017

function Cylinder() {

    this.name = "cylinder";
    this.numDivisions = 20; //number of triangles
    this.numVertices = 240; // number of vertices (corners)
    this.numTriangles = this.numDivisions*4;
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
        this.normals.push(vec4(0, 1, 0,0));
        this.normals.push(vec4(0, 1, 0,0));
        
        this.texCoords.push(vec2(0.5,0.5));
        this.texCoords.push(vec2(Math.cos(currentAngle)+0.5,Math.sin(currentAngle)+0.5));
        this.texCoords.push(vec2(Math.cos(nextAngle)+0.5,Math.sin(nextAngle)+0.5));


        //Bottom disk
        this.vertices.push(vec4(0, -1, 0,1)); // Center vertice
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        this.normals.push(vec4(0,-1,0,0)); 
        this.normals.push(vec4(0, -1, 0,0));
        this.normals.push(vec4(0, -1, 0,0));
        
        this.texCoords.push(vec2(0.5,0.5));
        this.texCoords.push(vec2(Math.cos(currentAngle+0.5,Math.sin(currentAngle)+0.5)));
        this.texCoords.push(vec2(Math.cos(nextAngle)+0.5,Math.sin(nextAngle)+0.5));
        

        //Connect triangles
        this.vertices.push(vec4(Math.cos(currentAngle), 1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));

        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0)); 
        
        this.texCoords.push(vec2(currentAngle/((Math.PI)*2),1));
        this.texCoords.push(vec2(currentAngle/((Math.PI)*2),-1));
        this.texCoords.push(vec2(nextAngle/((Math.PI)*2),1));

        this.vertices.push(vec4(Math.cos(currentAngle), -1, Math.sin(currentAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), 1, Math.sin(nextAngle),1));
        this.vertices.push(vec4(Math.cos(nextAngle), -1, Math.sin(nextAngle),1));

        this.normals.push(vec4(Math.cos(currentAngle), 0, Math.sin(currentAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0)); 
        this.normals.push(vec4(Math.cos(nextAngle), 0, Math.sin(nextAngle),0));
        
        this.texCoords.push(vec2(currentAngle/((Math.PI)*2),-1));
        this.texCoords.push(vec2(nextAngle/((Math.PI)*2),1));
        this.texCoords.push(vec2(nextAngle/((Math.PI)*2),-1));
        
         //Set colors
        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));
//
        this.colors.push(vec4(0,0,0.0,1));
        this.colors.push(vec4(0,0.0, 1.0,1));
        this.colors.push(vec4(0,0.2,1,1));
        
    }

}

