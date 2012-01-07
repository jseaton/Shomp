var context;
var container;
var shaders;
var chain;
var chainProto;
var tree;
var lookup;

function parse(s) {
    glsl.yy = {structs:{},params:[],errors:[]};
    glsl.parse(s);
    return glsl.yy;
}

function Shader(vEditor,fEditor) {
    this.vertexShaderEditor = vEditor;
    this.fragmentShaderEditor = fEditor;
}

Shader.prototype.update = function() {
    this.vertexShader = vertexShaderEditor.getValue();
    this.fragmentShader = fragmentShaderEditor.getValue();
    this.parseData = parse(this.vertexShader);
}

Shader.prototype.create = function(name, attr) {
    return new ShaderInstance(name, attr, this);
}

function ShaderInstance(name, shader, attr) {
    this.name = name;
    this.vertexShader = shader.vertexShader;
    this.fragmentShader = shader.fragmentShader;
    this.shader = shader;
    this.attr = attr;
}

ShaderInstance.prototype.genParams = function() { 
    this.data = this.shader.genParams(this.attr);
}

Shader.prototype.genParams = function(attr) {
    rp = this.shader.parseData.params.filter(function(e) {
	return e.ftype.qual == 'uniform';
    });
    params = {}
    for (var i=0;i<rp.length;i++) {
	for (var j=0;j<rp[i].list.length;j++) {
	    id = rp[i].list[j].id;
	    switch(rp[i].ftype.ptype.type) {
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
    }
    return params;
}

function updateShaderChain() {
    chain = []
    for (var i=0;i<chainProto.length;i++) {
	chainProto[i].genParams();
	chain[i].data = $.extend({vertices:GLOW.Geometry.Cube.vertices(500),uvs:GLOW.Geometry.Cube.uvs()},
				chain[i].data);
	if (i<chain.length-1) chain[i].fbo = new GLOW.FBO();
    }
}

function updateTree() {
    chainProto = []
    done = {}
    updateNode = function(node) {
	if (done[node.name]) return;
	done[node.name] = true;
	for (i in node.attr) updateNode(node.attr[i])
	chainProto.push(node);
    }
    updateNode(tree);
}

function render() {
    context.cache.clear();

    for (var i=0;i<chain.length-1;i++) {
	chain[i].fbo.bind();
	context.clear();
	new GLOW.Shader(chain[i]).draw();
	chain[i].fbo.unbind();
    }

    new GLOW.Shader(chain[-1]).draw();
}



$(document).ready(function() {
    shaders = {
	first : new Shader(
	    CodeMirror.fromTextArea(document.getElementById('vertexshader'),{'mode':'text/x-glsl'}),
	    CodeMirror.fromTextArea(document.getElementById('fragmentshader'),{'mode':'text/x-glsl'})
	)
    }

    context = new GLOW.Context();
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();
});
