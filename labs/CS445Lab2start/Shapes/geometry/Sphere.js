function Sphere(num_sides) { //start with disks instead of cylinders

    this.name = "Sphere";
    var num_cylinders = num_sides;
    this.numTriangles = num_sides * num_cylinders * 2;
    this.numVertices = this.numTriangles * 3;
    this.colors = [];
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var color1 = vec4(0.0, 0.0, 1.0, 1.0); // blue
    var color2 = vec4(1.0, 0.0, 1.0, 1.0); // blue
    var color3 = vec4(0.0, 1.0, 1.0, 1.0); // blue
    
    var outside_vertices = [];  
    //put vertices in a their location
    for (var i = 0; i <= num_cylinders; i++) {
        
        outside_vertices[i] = []; 
        var percent1 = (i* 3 * Math.PI/2)/ num_cylinders; //cos(pi/2) = 0
        
        //fixes an error where y value repeats after reaching -1
        var percent = percent1 * (2/3);
        var radius = Math.sin(percent); //beginning point should = (0,1) 
        var  yval = Math.cos(percent);

        for (var j = 0; j < num_sides; j++) { //create each disk

            var percentage = (2 * Math.PI * j) / num_sides;
            var xval = Math.cos(percentage) * radius;
            var zval = Math.sin(percentage) * radius;
            var newpoint = vec4(xval, yval, zval,1);
            outside_vertices[i][j] = newpoint;
        }
    }
    

    //color in triangles
    for (var i = 0; i < num_cylinders; i++) {   
                
        for (var j = 0; j < num_sides; j++) {
                        
            p1 = outside_vertices[i][j]; //norm
            p2 = outside_vertices[(i+1)][j]; //norm2
            p3 = outside_vertices[i][(j + 1) % num_sides]; //norm3
            
            p4 = outside_vertices[i][(j + 1) % num_sides]; //norm3
            p5 = outside_vertices[(i+1)][j]; //norm2
            p6 = outside_vertices[(i+1)][(j + 1) % num_sides]; //norm4
            
        var percentage = (2*Math.PI *j)/num_sides;
        var percentage2 = (2*Math.PI *((j+1) % num_sides))/num_sides;
        
        //note: w val is 0 for normals
        var ypercent = (i* 3 * Math.PI/2)/ num_cylinders;
        var ynorm = Math.cos(ypercent);

        var norm = normalize (p1.slice (0, 3)).concat (0); 
        var norm2 = normalize (p2.slice(0,3)).concat (0);
        var norm3 = normalize (p3.slice(0,3)).concat (0);
        var norm4 = normalize (p6.slice(0,3)).concat (0);


        //texcoords
            var angle = ((360/num_sides) *i)/360;
            var angle2 = ((360/num_sides) *j)/360;
            
            t1 = vec2(angle2, angle);
        
            this.vertices.push(p1, p2, p3, p4, p5, p6);
            this.colors.push(color1, color2, color3, color1, color2, color3);
            this.normals.push(norm,norm2,norm3,norm3,norm2,norm4);
            this.texCoords.push(t1,t1,t1,t1,t1,t1);
        }
        
    }
}


