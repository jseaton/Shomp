var context;
var container;
var shaders;
var chain;
var tree;
var lookup;
var pipeline;

function parse(s) {
    glsl.yy = {structs:{},params:[],errors:[]};
    try {
	glsl.parse(s);
    } catch(e) {
	console.log(e.message);
	glsl.yy.errors.unshift(e.message);
    }
    glsl.yy.params = $.extend.apply($,glsl.yy.params);
    return glsl.yy;
}

function Shader(vEditor,fEditor) {
    this.vertexShaderEditor   = vEditor;
    this.fragmentShaderEditor = fEditor;
    this.update();
}

Shader.prototype.update = function() {
    this.vertexShader   = this.vertexShaderEditor.getValue();
    this.fragmentShader = this.fragmentShaderEditor.getValue();
    blat = true; //TODO this is a horrendous hack
    this.parseData      = parse(this.vertexShader.split('\n').map(function (e) { if (e=='') blat=false; if (blat) {return e;} else {return '';}}).join('\n'));
}

Shader.prototype.create = function(name, attr) {
    return new ShaderInstance(name, attr, this);
}

function ShaderInstance(name, id, shader, attr, size) {
    this.name           = name;
    this.id             = id;
    this.vertexShader   = shader.vertexShader;
    this.fragmentShader = shader.fragmentShader;
    this.shader         = shader;
    this.data           = attr; //TODO
    this.elements       = GLOW.Geometry.Cube.elements(); //TODO
    this.size           = size;
}

ShaderInstance.prototype.update = function() {
    this.vertexShader   = this.shader.vertexShader;
    this.fragmentShader = this.shader.fragmentShader;
}

ShaderInstance.prototype.genParams = function() { 
    this.data = $.extend(this.shader.genParams(this.attr),this.attr); //TODO separation
}

Shader.prototype.genParams = function(attr) {
    var p = this.parseData.params
    params = {}
    for (id in p) {
	if (p[id].qual != 'uniform') continue;
	switch(p[id].type) {
	case "vec3":
	    params[id] = new GLOW.Vector3(0,1,2);
	    break;
	case "mat4":
	    params[id] = {cameraInverse:GLOW.defaultCamera.inverse,cameraProjection:GLOW.defaultCamera.projection,undefined:new GLOW.Matrix4()}[id];
	    break;
	case "sampler2D":
	    params[id] = attr[id] ? lookup[attr[id]].fbo : new GLOW.Texture({ url:"cube.JPG" });
	    break;
	}
    }
    return params;
}

//Note order - fbo of node must be generated before 
//any potential usage
function generateChainParams() {
    for (var i=0;i<chain.length;i++) {
	//chain[i].genParams();
	if (i<chain.length-1) chain[i].fbo = new GLOW.FBO(chain[i].size || {});
	for (j in chain[i].data) {
	    if (chain[i].data[j].name) chain[i].data[j] = chain[i].data[j].fbo;
	}
	chain[i].glow = new GLOW.Shader(chain[i]);
    }
}


//Topological sort on tree
function generateChain() {
    chain = []
    //lookup = {} //This is also marks nodes

    clearLookup = function(node) {
	if (!node.name) return;
	node.lookup = false;
	for (i in node.data) clearLookup(node.data[i])
    }
    clearLookup(tree);

    updateNode = function(node) {
	if (!node.name || node.lookup) return;
	node.lookup = true;
	for (i in node.data) updateNode(node.data[i])
	chain.push(node);
    }
    updateNode(tree);
}

function updateShaders() {
    for (i in shaders) shaders[i].update();
}

function updateTree() {
    $('#params').empty();
    tree = remapTree(evalTree(pipeline.getValue(),shaders),shaders);
    console.log(tree);
    genUI = function(node) {
	console.log(node);
	if (!node || !node.name) return;
	$('#params').append('<h3>' + node.id + '</h3>');
	$('#params').append(generateStructUI(node.shader.parseData.params,{},node.data));
	for (i in node.data) genUI(node.data[i]);
    }
    genUI(tree);
}

function updateChain() {
    generateChain();
    generateChainParams();
}

function render() {
    context.cache.clear();

    for (var i=0;i<chain.length-1;i++) {
	chain[i].fbo.bind();
	context.clear();
	chain[i].glow.draw();
	chain[i].fbo.unbind();
    }

    chain[chain.length-1].glow.draw();
}

function newShader(vText,hText) {
    var shaderName = 'shader';
    var i=1;
    while (shaders[shaderName+i]) i++;
    shaderName += i;

    var newTab = $('<h3><a href="#"></a></h3><div></div>');
    var shaderTag = $('<div><span>' + shaderName + '</span></div>');
    var editing = false;
    shaderTag.click(
	function() {
	    shaders[shaderName].fragmentShaderEditor.refresh();
	    shaders[shaderName].vertexShaderEditor.refresh();
	    if (editing) {
		shaderName = $(this).find('input').val();
		var sTag = $('<span>' + shaderName + '</span>');
		$(this).find('input').replaceWith(sTag); 
	    } else { 
		var sTag = $('<input type="text">').attr('value',shaderName);
		$(this).find('span').replaceWith(sTag); 
	    }
	    editing = !editing;
	}
    )
    console.log(newTab);
    newTab.find('a').change(function() {
	shaders[shaderName].fragmentShaderEditor.refresh();
	shaders[shaderName].vertexShaderEditor.refresh();
    }).append(shaderTag);
    var newShader = new Shader(CodeMirror(newTab[1],{'mode':'text/x-glsl',value:vText}),
			       CodeMirror(newTab[1],{'mode':'text/x-glsl',value:hText}));
    newTab.find('textarea').attr('cols','60').attr('rows','20');
    $('#accordion').append(newTab).accordion('destroy').accordion();
    shaders[shaderName] = newShader;
}

$(document).ready(function() {
    $('#accordion').accordion();

    shaders = {};
    newShader('attribute vec3 vertices;\n\
attribute vec2 uvs;\n\
uniform mat4 cameraInverse;\n\
uniform mat4 cameraProjection;\n\
uniform sampler2D img;\n\
uniform vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  uv = uvs;\n\
}',
'uniform sampler2D img;\n\
uniform vec4 v4;\n\
varying mediump vec2 uv;\n\
\n\
void main() {\n\
  gl_FragColor = texture2D(img,uv)*0.5 + v4;\n\
}');

    newShader('attribute vec3 vertices;\n\
attribute vec2 uvs;\n\
uniform mat4 cameraInverse;\n\
uniform mat4 cameraProjection;\n\
uniform sampler2D img;\n\
varying mediump vec2 pixel;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  pixel = uvs;\n\
}','uniform sampler2D img;\n\
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
}');

 newShader('attribute vec3 vertices;\n\
attribute vec2 uvs;\n\
uniform mat4 cameraInverse;\n\
uniform mat4 cameraProjection;\n\
uniform sampler2D img;\n\
varying mediump vec2 pixel;\n\
\n\
void main() {\n\
  gl_Position = cameraProjection * cameraInverse * vec4(vertices,1.0);\n\
  pixel = uvs;\n\
}','uniform sampler2D img;\n\
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
}');

    pipeline = CodeMirror.fromTextArea(document.getElementById('pipeline'),{'mode':'text/javascript'});

    context = new GLOW.Context()//{viewport:{width:80,height:80}});
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();
});
