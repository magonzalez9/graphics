<?php include("../../visual/header.php"); ?>

        <link rel="icon" type="image/x-icon" href="./favicon.png">

        <script id="vertex-shader" type="x-shader/x-vertex">
           precision mediump float;

            attribute vec4 vPosition;
            attribute vec4 vNormal;
            attribute vec4 vColor;

            uniform vec4 uLight_position; // assumed to be in eye coordinates. 
            uniform mat4 uProjection;
            uniform mat4 uModel_view;

            // output values that will be interpreted per-fragment
            varying  vec3 fN;
            varying  vec3 fE;
            varying  vec3 fL;
            varying vec4 color;

            void main()
            {
                color = vColor; 
                fN = normalize( uModel_view*vNormal ).xyz;
                fE = -(uModel_view*vPosition).xyz;
                fL = uLight_position.xyz - (uModel_view * vPosition).xyz;

                gl_Position = uProjection * uModel_view * vPosition;
            }


        </script>

        <script id="fragment-shader" type="x-shader/x-fragment">
            precision mediump float;

            // per-fragment interpolated values from the vertex shader
            varying vec3 fN;
            varying vec3 fL;
            varying vec3 fE;

            // incoming uniform values
            uniform vec4  uColor;
            uniform vec4  uLight_position;
            uniform vec4  uAmbient_product, uDiffuse_product, uSpecular_product;
            uniform float uShininess;

            void main()
            {
                vec4 myColor = uColor; //getColor()? 
                // Normalize the input lighting vectors
                vec3 N = normalize(fN);
                vec3 E = normalize(fE);
                vec3 L = normalize(fL);

                vec3 H = normalize( L + E );

                vec4 ambient = uAmbient_product*uColor; // myColor

                float diffDot = max(dot(L, N), 0.0);
                vec4 diffuse = diffDot*uDiffuse_product*uColor; //myColor

                float specDot = pow(max(dot(N, H), 0.0), uShininess);
                vec4 specular = specDot*uSpecular_product*uColor; //myColor

                // discard the specular highlight if the light's behind the vertex
                if( dot(L, N) < 0.0 ) {
                   specular = vec4(0.0, 0.0, 0.0, 1.0);
                }

                gl_FragColor  = ambient + diffuse + specular;

                gl_FragColor.a = 1.0;
            }

        </script>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script type="text/javascript" src="Lighting.js"></script>
        <script type="text/javascript" src="Common/webgl-utils.js"></script>
        <script type="text/javascript" src="Common/initShaders.js"></script>
        <script type="text/javascript" src="eventHandlers.js"></script> 
        <script type="text/javascript" src="Common/MV.js"></script>
        <script type="text/javascript" src="Common/MatrixStack.js"></script>
        <script type="text/javascript" src="geometry/FractalDEM.js"></script>
        <script type="text/javascript" src="geometry/Cube.js"></script>
        <script type="text/javascript" src="geometry/Cone.js"></script>
        <script type="text/javascript" src="geometry/Cylinder.js"></script>
        <script type="text/javascript" src="geometry/Disk.js"></script>
        <script type="text/javascript" src="geometry/Helicopter.js"></script>
         <script type="text/javascript" src="geometry/Fractal.js"></script>
        <script type="text/javascript" src="geometry/Axis.js"></script>
        <script type="text/javascript" src="geometry/Shapes.js"></script>
        <script type="text/javascript" src="Camera.js"></script>
        <script type="text/javascript" src="render_scene.js"></script>

        <h2> Lab 6: Fractal Landscape</h2>
        <table>
            <tr>
                <td>
                    <canvas id="gl-canvas" width="512" height="512" oncontextmenu="return false;">   
                        Oops ... your browser doesn't support the HTML5 canvas element
                    </canvas>


                </td>
                <td >
                    <div style = "background-color: LightGray">
                        <p> Keyboard Controls:</p>
                        <ul>
                            <li>[r] ........ reset parameters</li> 
                            <li>[q/a] ........ move forward/backward</li> 
                            <li>[w/e] ........ turn left/right</li> 
                            <li>[s/d] ........ turn up/down</li> 
                            <li>[x/c] ........ roll left/right</li> 
                        </ul>
                        <p> Mouse Controls:</p>
                        <ul>
                            <li>[Right Mouse drag] ... pan up/down/left/right</li> 
                            <li>[Middle Mouse drag] .. zoom in/out</li> 
                            <li>[Middle Mouse wheel] . zoom in/out</li> 
                            <li>[Left Mouse drag] .... tumble about origin</li> 
                        </ul> </div>
                    <div id="keypress"><b>Key pressed:</b> </div>
                    <div id="mouseAction"><b>Action:</b> </div>
                    <div id="mouseState"><b>Mouse State:</b></div>  

                    <p>light angle about y axis: 0% <input id="slider" type="range"
                  min="0" max="360" step="20" value="0" /> 100%</p>
                </td> </tr>
        </table>
    </body>
</html>
