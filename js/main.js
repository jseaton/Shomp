var context;
var container;
var vertexShader;
var fragmentShader;
var cubeShaderInfo;
var cube;
var parseData;

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

function render() {
    cubeShaderInfo.vertexShader =  vertexShader.getValue();
    //$('#vertexinfo').append(JSON.stringify(parse(cubeShaderInfo.vertexShader).params));
    cubeShaderInfo.fragmentShader =  fragmentShader.getValue();
    //$('#fragmentinfo').append(JSON.stringify(parse(cubeShaderInfo.fragmentShader).params));
    parseData = parse(cubeShaderInfo.vertexShader).params;
    //parseData = parseData.concat(parse(cubeShaderInfo.fragmentShader).params);
    cubeShaderInfo.data = $.extend({vertices:cubeShaderInfo.data.vertices,uvs:GLOW.Geometry.Cube.uvs()},genParams(parseData));

    cube = new GLOW.Shader( cubeShaderInfo );

    context.cache.clear();
    context.clear();
    cube.draw();
}

$(document).ready(function() {

    vertexShader   = CodeMirror.fromTextArea(document.getElementById('vertexshader'),{'mode':'text/x-glsl'});
    fragmentShader = CodeMirror.fromTextArea(document.getElementById('fragmentshader'),{'mode':'text/x-glsl'});
    context = new GLOW.Context();
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    cubeShaderInfo = {
	data: {vertices:GLOW.Geometry.Cube.vertices(500)},
	elements: GLOW.Geometry.Cube.elements() //this specifies how to make triangles from vertices, indexed by vertices/3
    }
    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();


});
