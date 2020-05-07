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


// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {


  vec2 coord = vTexCoord*u_resolution;
  vec2 st = vTexCoord;


  vec2 uv = vTexCoord;
  // normalized mouse coordinates
  vec2 n_mouse = vec2(0.);

  vec4 tex = texture2D(tx_buffer0, uv);

  // oscillator
  vec2 osc = vec2((cos(u_time)+1.0)/2.0,(sin(u_time)+1.0)/2.0);

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  vec2 cord = vTexCoord;

  // x values for red, y values for green, both for blue
  vec3 color = vec3(cord.x, cord.y, cord.x);

  gl_FragColor = vec4(cord.x, cord.y, cord.x,1.);

}
