// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
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

ivec2 ifc = ivec2(floor(coord+0.5));

// direct image flow visualization (but w/heavy spurious numerical diffusion)
vec3 sceneColor = vec3(texture2D(tx_buffer2, coord / u_resolution.xy));


gl_FragColor = vec4(clamp(sceneColor, 0., 1.), 1);

// gl_FragColor = vec4(texture2D(tx_buffer2, st).rgb,1.);
}
