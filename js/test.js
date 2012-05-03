function TestingShader(vS,fS) {
    this.vertexShader = vS;
    this.fragmentShader = fS;
    blat = true; //TODO this is a horrendous hack
    this.parseData      = parse(this.vertexShader.split('\n').map(function (e) { if (e=='') blat=false; if (blat) {return e;} else {return '';}}).join('\n'));
}

TestingShader.prototype.update = function () {}

function TestingPipeline(text) {
    this.text = text;
}

TestingPipeline.prototype.getValue = function () { 
    return this.text; 
}

function time(f) {
    var start = Date.now();
    f();
    return Date.now() - start;
}

function timeChange(spec) {
    shaders = spec.shaders;
    pipeline = spec.pipeline;
    tree = undefined;
    chain = undefined;

    return time(function() {
	updateShaders();
	updateTree();
	updateChain();
	render();
    });
}

var tests = {
    simple: {
	shaders: {texture:new TestingShader("attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}","uniform mediump sampler2D img;\n\
uniform mediump vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv);\n\
}")},
	pipeline: new TestingPipeline("output = new texture(); \n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
output.img = sampler2D('cube.JPG');")
    }
};

function timeTests() {
    var results = [];
    for (var i in tests)
	results.push(timeChange(tests[i]));
    console.log(results);
}

$(document).ready(function() {
    initContext();
    timeTests();
});