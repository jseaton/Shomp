var context;
var container;
var shaders;
var chain;
var tree;

function parse(s) {
    glsl.yy = {structs:{},params:[],errors:[]};
    glsl.parse(s);
    return glsl.yy;
}

function genParams(p, prev) {
    rp = p.filter(function(e) {
	return e.ftype.qual == 'uniform';
    });
    params = {}
    for (var i=0;i<rp.length;i++) {
	for (var j=0;j<rp[i].list.length;j++) {
	    switch(rp[i].ftype.ptype.type) {
	    case "vec3":
		params[rp[i].list[j].id] = new GLOW.Vector3(0,1,2);
		break;
	    case "mat4":
		params[rp[i].list[j].id] = {cameraInverse:GLOW.defaultCamera.inverse,cameraProjection:GLOW.defaultCamera.projection,undefined:new GLOW.Matrix4()}[rp[i].list[j].id];
		break;
	    case "sampler2D":
		console.log(prev);
		params[rp[i].list[j].id] = prev != undefined ? prev.fbo : new GLOW.Texture({ url:"cube.JPG" });
		break;
	    }
	}
    }
    return params;
}

function updateShaders() {
    for (var i=0;i<chain.length;i++) {
	chain[i].update();
	chain[i].data = $.extend({vertices:GLOW.Geometry.Cube.vertices(500),uvs:GLOW.Geometry.Cube.uvs()},
				   genParams(parse(chain[i].vertexShader).params, i==0 ? undefined : chain[i-1]));
	if (i<chain.length-1) chain[i].fbo = new GLOW.FBO();
    }
}

function updateTree() {
    chain = []
    done = {}
    updateNode = function(node) {
	console.log(JSON.stringify(node));
	if (done[node.name]) return;
	done[node.name] = true;
	for (i in node.attr) updateNode(node.attr[i])
	chain.push(node);
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

function Shader(vEditor,fEditor) {
    this.vertexShaderEditor = vEditor;
    this.fragmentShaderEditor = fEditor;
}

Shader.prototype.update = function() {
    this.vertexShader = vertexShaderEditor.getValue();
    this.fragmentShader = fragmentShaderEditor.getValue();
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
