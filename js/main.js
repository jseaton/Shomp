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

function genParams(p) {
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
		params[rp[i].list[j].id] = GLOW.defaultCamera.inverse;
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
    parseData = parse(cubeShaderInfo.vertexShader);
    cubeShaderInfo.data = $.extend({vertices:cubeShaderInfo.data.vertices},genParams(parseData.params));

    cube = new GLOW.Shader( cubeShaderInfo );

    context.cache.clear();
    context.clear();
    cube.draw();
}

$(document).ready(function() {
    glsl.yy = {structs:{},params:[],errors:[]};

    vertexShader   = CodeMirror.fromTextArea(document.getElementById('vertexshader'),{'mode':'text/x-glsl'});
    fragmentShader = CodeMirror.fromTextArea(document.getElementById('fragmentshader'),{'mode':'text/x-glsl'});
    context = new GLOW.Context();
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    cubeShaderInfo = {
	vertexShader: vertexShader.getValue(),
	fragmentShader: fragmentShader.getValue(),
	data: {vertices:GLOW.Geometry.Cube.vertices(500),
	       cameraInverse: GLOW.defaultCamera.inverse,
	       cameraProjection: GLOW.defaultCamera.projection,
	      },

	elements: GLOW.Geometry.Cube.elements() //this specifies how to make triangles from vertices, indexed by vertices/3
    }

    cube = new GLOW.Shader( cubeShaderInfo );
    //cube.transform.setPosition( 100, 100, 100 );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();

    //setInterval( render, 1000 / 60 );


});
