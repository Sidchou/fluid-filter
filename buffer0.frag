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
// uniform sampler2D tx_buffer2;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {

  vec4 outColor;
  //jet or not
  bool jet = true;

  vec2 coord = vTexCoord*u_resolution; // 0 << >> width height
  vec2 st = vTexCoord;//0 << >> 1

  vec2 uv = (coord.xy - u_resolution.xy*.5) / u_resolution.y;
  float aspect = float(u_resolution.x) / float(u_resolution.y); //aspect ratio

  if (u_frame < 10 && !jet) {
    vec3 sceneColor;
        float initpack = 1.0;
        float stagger= floor(coord.y / 4.)/ u_resolution.y;

            if (false) {
            // linear shear (classic K-H)
			      //sceneColor = vec3((uv[0] + stagger) / initpack + 0.05*0., -0, 0.05);
          } else {
            //rotational shear
			// float coord = 2.*3.14159 * (uv[0] + stagger) / initpack / aspect * 1.004;
			// float circrad = 0.4;
			// sceneColor = vec3(sin(coord)*circrad, cos(coord)*circrad, -0.05);
          }
    outColor = vec4(sceneColor, 1);
  }else {
    ivec2 ifc = ivec2(floor(coord+0.5));
    //vec4 puvc = texelFetch(tx_buffer0, ivec2(0, 0), 0);
    vec4 puvc = texture2D(tx_buffer0, st);

    vec2 pxy = vec2(puvc) * u_resolution.y + u_resolution.xy*.5;
    ivec2 ipxy = ivec2(floor(pxy+0.5));
    vec2 uvipxy = (vec2(ipxy) - u_resolution.xy*.5) / u_resolution.y;

    vec2 vxvy = vec2(texture2D(tx_buffer1, pxy / vec2(u_resolution)));

    float dt = 0.0001 ; // iTimeDelta * 0.01;

    outColor = puvc + dt * vec4(vxvy, 0, 0);

    // Wrap the particles around if they manage to get out (not entirely physical)
    aspect = 1./1.0 * .99 * aspect;

    float aspy = .99;
    if (outColor.r> aspect * .5) outColor.r -= aspect;
    if (outColor.r <= -aspect * .5) outColor.r += aspect;
    if (outColor.g> aspy * .5) outColor.g -= aspy;
    if (outColor.g <= -aspy * .5) outColor.g += aspy;



    // if (abs(coord.x + coord.y / u_resolution.y * 20. - u_mouse.x) < 1.0 /*&& u_mouse.z > 0.*/) {
		// 	vec2 muv = (vec2(u_mouse) - u_resolution.xy*.5) / u_resolution.y;
    //   outColor = vec4(muv, outColor.b, outColor.a);
    //
    // }

  }

  if(jet){
    vec3 sceneColor;
    float stagger= floor(coord.y / 4.)/ u_resolution.y;

    if (u_frame == int(floor(.5+(aspect*.5 + uv.x + stagger) * 100.))) {
      if (false){
            if (int(floor(mod(coord.x / 2., 2.)+0.5)) == 0) {
                outColor = vec4(aspect*.49, -0.1, .2, 1.);
      } else {
                outColor = vec4(aspect*.49, 0.1, -.2, 1.);
            }
      }
    }


  }

  //outColor = vec4(1.,0.,0.,1.);





  vec4 color = vec4(0.);

  color = vec4(vec3(outColor.r),1.0);

  // gl_FragColor = color;
  gl_FragColor = texture2D(tx_buffer1, st);
  gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, vTexCoord.x,1.);
}
