function Sun(num_sides) { //start with disks instead of cylinders

    Sphere.apply(this,arguments);
    this.name = "Sun";

    for(var i = 0; i < this.normals.length; i++){
        this.normals[i] = scale(-1, this.normals[i]);

    }
 
}