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
uniform sampler2D tx_buffer3;


// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {

  // No-flux boundary conditions:
  // (set these to true to keep the flow boxed in -- computationally expensive, tho)
  bool boxx = true;
  bool boxy = true;

  vec2 coord = vTexCoord*u_resolution;
  vec2 st = vTexCoord;

  vec2 uv = (coord.xy - u_resolution.xy*.5) / u_resolution.y;

  vec2 vxvy = vec2(0.0);

  float aspect = 1./1.0 *  .99/.98 * .98 * float(u_resolution.x) / float(u_resolution.y);
  float aspy = .98;
  float rfac = 0.05; // divergence fudge factor for approximate no flux

  const int subsamp = 2;
   //int n = int(u_resolution.x) / subsamp - 1; // / 2.);//viscosity
  const int n = 50;
  const int nv = 3;

  for (int i = 0; i < n; i++) {
    for (int j = 0; j < nv; j++) {
       vec4 puvc = texelFetch(tx_buffer0, ivec2(i * subsamp, j * subsamp),0);
      //vec4 puvc = texture2D(tx_buffer0, vTexCoord);
      vec2 puv = vec2(puvc.xy); //vec2(puvc[0], puvc[1]);

      vec2 duv = uv - puv;
      float d2 = dot(duv, duv);

      if (sqrt(d2) > 0.01) {
        vxvy += puvc.b * vec2(-duv.g, duv.r) / d2;
      }

      if (boxy) {

          float qinv = -puvc.b;
          vec2 pinv = vec2(puv.r, aspy - puv.g);

          duv = uv - pinv;
        d2 = dot(duv, duv);

          if (sqrt(d2) > 0.01) {
              vxvy += qinv * (vec2(-duv.g, duv.r) + sign(qinv) * duv * rfac) / d2;
          }

      }


      if (boxy) {

          float qinv = -puvc.b;
          vec2 pinv = vec2(puv.r, -aspy - puv.g);

          duv = uv - pinv;
        d2 = dot(duv, duv);

          if (sqrt(d2) > 0.01) {
              vxvy += qinv * (vec2(-duv.g, duv.r) + sign(qinv) * duv * rfac) / d2;
          }

      }


      if (boxx) {

          float qinv = -puvc.b;
          vec2 pinv = vec2(aspect - puv.r, puv.g);

          duv = uv - pinv;
        d2 = dot(duv, duv);

          if (sqrt(d2) > 0.01) {
              vxvy += qinv * (vec2(-duv.g, duv.r) + sign(qinv) * duv * rfac) / d2;
          }

      }

      if (boxx) {

          float qinv = -puvc.b;
          vec2 pinv = vec2(-aspect - puv.r, puv.g);

          duv = uv - pinv;
        d2 = dot(duv, duv);

          if (sqrt(d2) > 0.01) {
              vxvy += qinv * (vec2(-duv.g, duv.r) + sign(qinv) * duv * rfac) / d2;
          }
        }
     }
  }

gl_FragColor = vec4(vxvy, 0., 1.);
// gl_FragColor = texture2D(tx_buffer0,vTexCoord);



  // }









}
