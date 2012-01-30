var context;
var container;
var shaders;
var chain;
var tree;
var lookup;
var pipeline;

function parse(s) {
    glsl.yy = {structs:{},params:[],errors:[]};
    glsl.parse(s);
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
    this.parseData      = parse(this.vertexShader);
}

Shader.prototype.create = function(name, attr) {
    return new ShaderInstance(name, attr, this);
}

function ShaderInstance(name, shader, attr) {
    this.name           = name;
    this.vertexShader   = shader.vertexShader;
    this.fragmentShader = shader.fragmentShader;
    this.shader         = shader;
    this.data           = attr; //TODO
    this.elements       = GLOW.Geometry.Cube.elements(); //TODO
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
	if (i<chain.length-1) chain[i].fbo = new GLOW.FBO();
    }
}

//Topological sort on tree
function generateChain() {
    chain = []
    lookup = {} //This is also marks nodes
    updateNode = function(node) {
	if (!node.name || lookup[node.name]) return;
	lookup[node.name] = node;
	for (i in node.attr) updateNode(node.attr[i])
	chain.push(node);
    }
    updateNode(tree);
}

function updateShaders() {
    for (i in shaders) shaders[i].update();
}

function updateTree() {
    tree = remapTree(evalTree(pipeline.getValue(),shaders),shaders);
    $('#params').append(generateStructUI(tree.shader.parseData.params,{},tree.data));
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
	new GLOW.Shader(chain[i]).draw();
	chain[i].fbo.unbind();
    }

    new GLOW.Shader(chain[chain.length-1]).draw();
}



$(document).ready(function() {
    $('#accordion').accordion();

    shaders = {
	first : new Shader(
	    CodeMirror.fromTextArea(document.getElementById('vertexshader'),{'mode':'text/x-glsl'}),
	    CodeMirror.fromTextArea(document.getElementById('fragmentshader'),{'mode':'text/x-glsl'})
	)
    }
    pipeline = CodeMirror.fromTextArea(document.getElementById('pipeline'),{'mode':'text/javascript'});

    context = new GLOW.Context();
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();
});
