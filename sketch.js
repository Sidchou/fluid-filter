// a shader variable
let theShader;
let buffers = new Array(3);

let bufferGraphic = new Array(3);

function preload(){
  // load the shader
  theShader = loadShader('shader.vert', 'shader.frag');
  for(let i = 0; i < buffers.length; i++){
  buffers[i] = loadShader("shader.vert", "buffer"+i+".frag");
}

}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  pixelDensity(1);

  // shaders require WEBGL mode to work
  // createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(400, 400, WEBGL);

    for(let i = 0; i < buffers.length; i++){
  bufferGraphic[i] = createGraphics(windowWidth,windowHeight,WEBGL);
    }
  noStroke();
  //fill(0);

}

function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);


  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

      for(let i = 0; i < buffers.length; i++){
  bufferGraphic[i].shader(buffers[i]);

  theShader.setUniform("tx_buffer"+i, bufferGraphic[i]);

  buffers[i].setUniform("u_resolution", [width, height]);
  buffers[i].setUniform("u_time", millis() / 1000.0);
  buffers[i].setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  buffers[i].setUniform("u_frame", frameCount);
for(let j = 0; j < buffers.length; j++){
  buffers[i].setUniform("tx_buffer"+j, bufferGraphic[j]);
}
  bufferGraphic[i].rect(0,0,width, height);
}

  // buffers[0].setUniform("tx_buffer0", bufferGraphic[0]);
  // buffers[0].setUniform("tx_buffer1", bufferGraphic[0]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);

  console.log(frameCount);


}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }
