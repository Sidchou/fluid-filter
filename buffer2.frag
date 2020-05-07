// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform sampler2D tx_buffer0;
uniform sampler2D tx_buffer1;
uniform sampler2D tx_buffer2;


// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {


 vec2 coord = vTexCoord*u_resolution;
 vec2 st = vTexCoord;

 vec2 uv = (coord.xy - u_resolution.xy*.5) / u_resolution.y;
 float aspect = float(u_resolution.x) / float(u_resolution.y);

 float dt = 0.0001 ;

 if (u_frame < 10) {
     // inverse displacement map (but with numerical diffusion spuriously smoothing the map)

     gl_FragColor = vec4(uv, 0, 0);
 } else {
     ivec2 ifc = ivec2(floor(coord+.5));

     vec2 vxvy = vec2(texture2D(tx_buffer1, st));

     vec2 newFragCoord = coord - dt * vxvy * vec2(u_resolution);

    gl_FragColor = texture2D(tx_buffer2, newFragCoord / vec2(u_resolution));
 }

/*

vec2 uv = (fragCoord.xy - iResolution.xy*.5) / iResolution.y;
    float aspect = float(iResolution.x) / float(iResolution.y);

    float dt = 0.0001 ;


    if (iFrame < 10) {
        // inverse displacement map (but with numerical diffusion spuriously smoothing the map)
        fragColor = vec4(uv, 0, 0);
    } else {
        ivec2 ifc = ivec2(round(fragCoord));

        vec2 vxvy = vec2(texture(iChannel0, fragCoord / vec2(iResolution)));

        vec2 newFragCoord = fragCoord - dt * vxvy * vec2(iResolution);

        fragColor = texture(iChannel1, newFragCoord / vec2(iResolution));
    }

*/


}
