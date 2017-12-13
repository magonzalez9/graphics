function Uranus () {

	this.name = "uranus";
    var uranusTexture; 
    var saturnTexture;
    var saturnRing;
    var ringTexture;
}
Uranus.prototype.draw = function(){
   stack.push(); 
   this.drawUranus();
   stack.pop(); 
}

Uranus.prototype.drawUranus = function(){
    stack.push();
    this.drawRings();
    this.drawPlanet();
    stack.pop();

}

Uranus.prototype.drawPlanet = function(){
    stack.push();
    stack.multiply(scalem(9,9,9))
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    saturnTexture.activate();
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();

    stack.push();
    stack.multiply(scalem(20,20,20));
    gl.uniform1i(uColorMode,2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    ringTexture.activate();
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();


}


Uranus.prototype.drawRings = function (){

    stack.push();
    stack.multiply(scalem(100,100,100));
    Shapes.drawPrimitive(Shapes.planetRing);
    stack.pop();


}


