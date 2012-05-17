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

function spaces(n) {
    var r = " ";
    for (var i=0;i<n;i++)
	r += " ";
    return r;
}

function timeChange(spec,n) {
    shaders = {};
    for (var i in spec.shaders) //pad to avoid caching
	shaders[i] = new TestingShader(spec.shaders[i].vertex+spaces(n),spec.shaders[i].fragment+spaces(n));

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

function timeSingle(spec,n) {
    shaders = {};
    var keys = [];
    for (var i in spec.shaders) {
	shaders[i] = new TestingShader(spec.shaders[i].vertex+spaces(n),spec.shaders[i].fragment+spaces(n+1));
	keys.push(i);
    }

    pipeline = spec.pipeline;
    tree = undefined;
    chain = undefined;

    updateShaders();
    updateTree();
    updateChain();
    render();

    var shader = keys[n%keys.length];
    console.log(shader);
    console.log(n);
    console.log(keys);
    shaders[shader] = new TestingShader(spec.shaders[shader].vertex+spaces(n+1),spec.shaders[shader].fragment+spaces(n+1));
    return time(function() {
	updateShader(shader);
	render();
    });
}

var tests = {simple:{},gauss:{},chain:{},sanity:{},redundant:{}};

tests.simple.shaders = {
    texture:{
	vertex:"attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}",
		fragment:"uniform mediump sampler2D img;\n\
uniform mediump vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv);\n\
}"
    }
};

tests.simple.pipeline = new TestingPipeline("output = new texture(); \n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
output.img = sampler2D('cube.JPG');");


tests.gauss.shaders = {
    textureShader:{
	vertex:"attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}",
	fragment:"uniform mediump sampler2D img;\n\
uniform mediump vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv);\n\
}"
    },
    gaussVShader:{
	vertex:"attribute vec3 vertices;\n\
attribute vec2 uvs;\n\
uniform mat4 cameraInverse;\n\
uniform mat4 cameraProjection;\n\
uniform sampler2D img;\n\
varying mediump vec2 pixel;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  pixel = uvs;\n\
}",
	fragment:"uniform sampler2D img;\n\
varying highp vec2 pixel;\n\
\n\
void main(void) {\n\
  highp vec4 sum = vec4(0.0);\n\
  highp float v = 0.003;\n\
  sum += texture2D(img, vec2(pixel.x, - 4.0*v + pixel.y) ) * 0.05;\n\
  sum += texture2D(img, vec2(pixel.x, - 3.0*v + pixel.y) ) * 0.09;\n\
  sum += texture2D(img, vec2(pixel.x, - 2.0*v + pixel.y) ) * 0.12;\n\
  sum += texture2D(img, vec2(pixel.x, - 1.0*v + pixel.y) ) * 0.15;\n\
  sum += texture2D(img, vec2(pixel.x, + 0.0*v + pixel.y) ) * 0.16;\n\
  sum += texture2D(img, vec2(pixel.x, + 1.0*v + pixel.y) ) * 0.15;\n\
  sum += texture2D(img, vec2(pixel.x, + 2.0*v + pixel.y) ) * 0.12;\n\
  sum += texture2D(img, vec2(pixel.x, + 3.0*v + pixel.y) ) * 0.09;\n\
  sum += texture2D(img, vec2(pixel.x, + 4.0*v + pixel.y) ) * 0.05;\n\
  gl_FragColor.xyz = sum.xyz/0.98;\n\
  gl_FragColor.a = 1.;\n\
}"
    },
    gaussHShader:{
	vertex:"attribute vec3 vertices;\n\
attribute vec2 uvs;\n\
uniform mat4 cameraInverse;\n\
uniform mat4 cameraProjection;\n\
uniform sampler2D img;\n\
varying mediump vec2 pixel;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  pixel = uvs;\n\
}",
	fragment:"uniform sampler2D img;\n\
varying highp vec2 pixel;\n\
\n\
void main(void) {\n\
  highp vec4 sum = vec4(0.0);\n\
  highp float h = 0.003;\n\
  sum += texture2D(img, vec2(- 4.0*h + pixel.x, pixel.y)) * 0.05;\n\
  sum += texture2D(img, vec2(- 3.0*h + pixel.x, pixel.y)) * 0.09;\n\
  sum += texture2D(img, vec2(- 2.0*h + pixel.x, pixel.y)) * 0.12;\n\
  sum += texture2D(img, vec2(- 1.0*h + pixel.x, pixel.y)) * 0.15;\n\
  sum += texture2D(img, vec2(+ 0.0*h + pixel.x, pixel.y)) * 0.16;\n\
  sum += texture2D(img, vec2(+ 1.0*h + pixel.x, pixel.y)) * 0.15;\n\
  sum += texture2D(img, vec2(+ 2.0*h + pixel.x, pixel.y)) * 0.12;\n\
  sum += texture2D(img, vec2(+ 3.0*h + pixel.x, pixel.y)) * 0.09;\n\
  sum += texture2D(img, vec2(+ 4.0*h + pixel.x, pixel.y)) * 0.05;\n\
  gl_FragColor.xyz = sum.xyz/0.98;\n\
  gl_FragColor.a = 1.;\n\
}"
    }
};

tests.gauss.pipeline = new TestingPipeline("output = new gaussVShader('gaussh'); //gaussh\n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
\n\
gaussv = new gaussVShader('gaussv');\n\
gaussv.vertices = GLOW.Geometry.Cube.vertices(500);\n\
gaussv.uvs = GLOW.Geometry.Cube.uvs();\n\
gaussv.cameraProjection = GLOW.defaultCamera.projection;\n\
gaussv.cameraInverse = GLOW.defaultCamera.inverse;\n\
\n\
input = new textureShader('input');\n\
input.vertices = GLOW.Geometry.Cube.vertices(500);\n\
input.uvs = GLOW.Geometry.Cube.uvs();\n\
input.cameraProjection = GLOW.defaultCamera.projection;\n\
input.cameraInverse = GLOW.defaultCamera.inverse;\n\
\n\
output.img = gaussv;\n\
gaussv.img = input;\n\
input.img = sampler2D('cube.JPG');");

function timeTests() {
    var results = {};
    var c=0;
    for (var i in tests) {
	results[i] = {full:[],single:[]};
	for (var j=0;j<10;j++) {
	    results[i].full.push(timeChange(tests[i],c*3));
	    results[i].single.push(timeSingle(tests[i],c*3+1));
	    c++;
	}
	results[i].fullAvg = 0;
	//results[i].fullMin = Infinity;
	//results[i].fullMax = 0;
	results[i].fullSumSq = 0;

	results[i].singleAvg = 0;
	//results[i].singleMin = Infinity;
	//results[i].singleMax = 0;
	results[i].singleSumSq = 0;
	for (var j=0;j<results[i].full.length;j++) {
	    results[i].fullAvg += results[i].full[j];
	    //results[i].fullMin = results[i].fullMin > results[i].full[j] ? results[i].full[j] : results[i].fullMin
	    //results[i].fullMax = results[i].fullMax < results[i].full[j] ? results[i].full[j] : results[i].fullMax
	    results[i].fullSumSq += results[i].full[j]*results[i].full[j];

	    results[i].singleAvg += results[i].single[j];
	    //results[i].singleMin = results[i].singleMin > results[i].single[j] ? results[i].single[j] : results[i].singleMin
	    //results[i].singleMax = results[i].singleMax < results[i].single[j] ? results[i].single[j] : results[i].singleMax
	    results[i].singleSumSq += results[i].single[j]*results[i].single[j];
	}
	results[i].fullAvg /= results[i].full.length;
	results[i].singleAvg /= results[i].single.length;
	results[i].fullSigma = Math.sqrt((results[i].fullSumSq/results[i].full.length) - results[i].fullAvg*results[i].fullAvg);
	results[i].singleSigma = Math.sqrt((results[i].singleSumSq/results[i].single.length) - results[i].singleAvg*results[i].singleAvg);

    }
    return results;
}

tests.simple.shaders = {
    texture:{
	vertex:"attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}",
		fragment:"uniform mediump sampler2D img;\n\
uniform mediump vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv);\n\
}"
    }
};

tests.chain.shaders = {
    texture:{
	vertex:"attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}",
		fragment:"uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv);\n\
}"
    }
};

tests.chain.pipeline = new TestingPipeline("output = new texture(); \n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
\n\
var c = output;\n\
for (var i=0;i<10;i++) {\n\
c.img = new texture();\n\
c = c.img;\n\
c.vertices = GLOW.Geometry.Cube.vertices(500);\n\
c.uvs = GLOW.Geometry.Cube.uvs();\n\
c.cameraProjection = GLOW.defaultCamera.projection;\n\
c.cameraInverse = GLOW.defaultCamera.inverse;\n\
}\n\
c.img = sampler2D('tux.JPG');\n\
");

tests.sanity.shaders = {
    texture:{
	vertex:"attribute mediump vec3 vertices;\n\
attribute mediump vec2 uvs;\n\
uniform mediump mat4 cameraInverse;\n\
uniform mediump mat4 cameraProjection;\n\
uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}",
		fragment:"uniform mediump sampler2D img;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv) + vec4(1.0,0.0,0.0,0.0);\n\
}"
    }
};

tests.sanity.pipeline = new TestingPipeline("output = new texture(); \n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
\n\
var c = output;\n\
for (var i=0;i<10;i++) {\n\
c.img = new texture();\n\
c = c.img;\n\
c.vertices = GLOW.Geometry.Cube.vertices(500);\n\
c.uvs = GLOW.Geometry.Cube.uvs();\n\
c.cameraProjection = GLOW.defaultCamera.projection;\n\
c.cameraInverse = GLOW.defaultCamera.inverse;\n\
}\n\
c.img = sampler2D('tux.JPG');\n\
");

tests.redundant.shaders = {texture:tests.simple.shaders.texture,gaussVShader:tests.gauss.shaders.gaussVShader,gaussHShader:tests.gauss.shaders.gaussHShader,sanity:tests.sanity.shaders.texture}
tests.redundant.pipeline =  new TestingPipeline("output = new texture(); \n\
output.vertices = GLOW.Geometry.Cube.vertices(500);\n\
output.uvs = GLOW.Geometry.Cube.uvs();\n\
output.cameraProjection = GLOW.defaultCamera.projection;\n\
output.cameraInverse = GLOW.defaultCamera.inverse;\n\
output.img = sampler2D('cube.JPG');");

$(document).ready(function() {
    initContext();
    var r = timeTests();
    console.log(r);
    $("#output").append("symbolic x coords={");
    for (var n in r) {
	$("#output").append(n + ",");
    }
    $("#output").append("ham}]\n");
    for (var i=0;i<2;i++) {
	$("#output").append("\\addplot+[error bars/.cd,y dir=both,y explicit] coordinates {");
	for (var n in r) {
	    var sigma = i==0 ? r[n].fullSigma : r[n].singleSigma;
	    $("#output").append("("+n+","+ ( i==0 ? r[n].fullAvg : r[n].singleAvg ) +") +- (" + sigma + "," + sigma + ")\n");
	}
	$("#output").append("};\n");
    }
    $("#output").append("\\legend{unoptimised, optimised}\n\\end{axis}\n\\end{tikzpicture}");
});