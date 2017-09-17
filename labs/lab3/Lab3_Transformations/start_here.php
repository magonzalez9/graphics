<?php include("../../../visual/header.php"); ?>
<html>
    <link rel="icon" type="image/x-icon" href="./favicon.png">
    <script id="vertex-shader" type="x-shader/x-vertex">
       attribute vec4 vPosition;
       attribute vec4 vColor;
       uniform   mat4 uProjection; // projection matrix
       uniform   mat4 uModel_view; // model view matrix
 
       varying vec4 color;
            
       void main() 
       {
           color = vColor;
           gl_Position = uProjection * uModel_view * vPosition;
       } 
    </script>

    <script id="fragment-shader" type="x-shader/x-fragment">
        precision mediump float;

        uniform vec4 uColor;

        void
        main()
        {
             gl_FragColor = uColor;
        }
    </script>

    <script type="text/javascript" src="Common/webgl-utils.js"></script>
    <script type="text/javascript" src="Common/initShaders.js"></script>
    <script type="text/javascript" src="Common/MV.js"></script>

    
 <!-- TO DO: ADD MATRIX STACK AND SHAPES-->
     <script type="text/javascript" src="Common/MatrixStack.js"></script>
    <script type="text/javascript" src="geometry/Cube.js"></script>
   
    <script type="text/javascript" src="geometry/Shapes.js"></script>
    <script type="text/javascript" src="render_scene.js"></script>


    <body>

        <h2> Lab 3: Transformations</h2>

        <canvas id="gl-canvas" width="512" height="512">
            Oops ... your browser doesn't support the HTML5 canvas element
        </canvas>

        <br/>

    </body>
</html>
