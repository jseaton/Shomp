context = undefined;
container = undefined;
shaders = {};
chain = [];
tree = {};
lookup = {};
pipeline = undefined;

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

/*Shader.prototype.create = function(name, attr) {
    return new ShaderInstance(name, attr, this);
}*/

function ShaderInstance(name, id, shader, attr, size) {
    this.name           = name;
    this.id             = id;
//    this.vertexShader   = shader.vertexShader;
//    this.fragmentShader = shader.fragmentShader;
    this.shader         = shader;

    this.uniforms       = attr.uniforms;
    this.others         = attr.others;
    this.children       = attr.children;

    this.elements       = GLOW.Geometry.Cube.elements(); //TODO
    this.size           = size;
    this.glow           = {};
}

//ShaderInstance.prototype.update = function() {
//    this.vertexShader   = this.shader.vertexShader;
//    this.fragmentShader = this.shader.fragmentShader;
//}

ShaderInstance.prototype.updateGLOW = function() {
    this.glow = new GLOW.Shader(
	{
	    vertexShader:this.shader.vertexShader,
	    fragmentShader:this.shader.fragmentShader,
	    elements:this.elements,
	    data:$.extend(this.others,$.extend(this.uniforms,this.glow.uniforms))
	}
    );
}

/*
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
}*/

//Note order - fbo of node must be generated before 
//any potential usage
function generateChainParams() {
    for (var i=0;i<chain.length;i++) {
	var node = chain[i];
	if (i<chain.length-1) node.fbo = new GLOW.FBO();//chain[i].size || {});
    }
    for (var i=0;i<chain.length;i++) {
	var node = chain[i];
	for (var j in node.children) {
	    node.uniforms[j] = node.children[j].fbo;
	}
	node.updateGLOW();
    }
}


//Topological sort on tree
function generateChain() {
    chain = []
    //lookup = {} //This is also marks nodes

    clearLookup = function(node) {
	if (!node.name) return;
	node.lookup = false;
	for (i in node.children) clearLookup(node.children[i])
    }
    clearLookup(tree);

    updateNode = function(node) {
	if (!node.name || node.lookup) return;
	node.lookup = true;
	for (i in node.children) updateNode(node.children[i])
	chain.push(node);
    }
    updateNode(tree);
}

function updateShaders() {
    for (i in shaders) updateShader(i);
}

//Note: updateShader must not be called unless a chain has already
//been generated, ensuring FBO existance
function updateShader(name) {
    shaders[name].update();
    for (i in chain) {
	if (chain[i].name != name) continue;
	chain[i].data = new GLOW.Shader(chain[i]);
    }
}

function updateTree() {
    $('#params').empty();
    tree = remapTree(evalTree(pipeline.getValue(),shaders),shaders);
    console.log(tree);
    genUI = function(node) {
	console.log(node);
	if (!node || !node.name) return;
	$('#params').append('<h3>' + node.id + '</h3>');
	//node.glow = node.data;
	var gen = generateUI(node);
	console.log(gen);
	$('#params').append(gen.html);
	node.others = $.extend(gen.deflt,node.others);
	for (var i in node.children) genUI(node.children[i]);
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

function newShader(vText,hText,name) {
    var shaderName;
    if (!name) {
	shaderName = 'shader';
	var i=1;
	while (shaders[shaderName+i]) i++;
	shaderName += i;
    } else shaderName = name;

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

function initContext() {
    context = new GLOW.Context()//{viewport:{width:80,height:80}});
    context.setupClear( { red: 1, green: 1, blue: 1 } );
    container = document.getElementById( "container" );
    container.appendChild( context.domElement );

    GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 1500 );
    GLOW.defaultCamera.update();
}