var context;
var container;
var shaders;

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
		params[rp[i].list[j].id] = prev != undefined ? prev : new GLOW.Texture({ url:"cube.JPG" });
		break;
	    }
	}
    }
    return params;
}

function updateShaders() {
    for (var i=0;i<shaders.length;i++) {
	shaders[i].vertexShader   = shaders[i].vertexShaderEditor.getValue();
	shaders[i].fragmentShader = shaders[i].fragmentShaderEditor.getValue();
	shaders[i].data = $.extend({vertices:GLOW.Geometry.Cube.vertices(500),uvs:GLOW.Geometry.Cube.uvs()},
					genParams(parse(shaders[i].vertexShader).params),i==0 ? undefined : shaders[i-1].fbo);
	if (i<shaders.length-1) shaders[i].fbo = new GLOW.FBO();
    }
}

function render() {
    context.cache.clear();
    context.clear();

    for (var i=0;i<shaders.length;i++) {
	if (shaders[i].fbo) shaders[i].fbo.bind();
	new GLOW.Shader(shaders[i]).draw();
	if (shaders[i].fbo) shaders[i].fbo.unbind();
    }
}

$(document).ready(function() {
    shaders = [
	{
	    vertexShaderEditor   : CodeMirror.fromTextArea(document.getElementById('vertexshader'),{'mode':'text/x-glsl'}),
	    fragmentShaderEditor : CodeMirror.fromTextArea(document.getElementById('fragmentshader'),{'mode':'text/x-glsl'}),
	    elements             : GLOW.Geometry.Cube.elements(),
	    data                 : {}
	}
    ]

    context = new GLOW.Context();
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();
});
