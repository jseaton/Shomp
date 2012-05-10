function evalTree(text,shaders) {
    eval(genShaderFunctions(shaders));

    vec2 = GLOW.Vector2;
    vec3 = GLOW.Vector3;
    vec4 = GLOW.Vector4;

    mat3 = GLOW.Matrix3;
    mat4 = GLOW.Matrix4;

    function sampler2D(url) { 
	return new GLOW.Texture({url:url});
    }

    eval(text);
    return output;
}

function genShaderFunctions(shaders) {
    var fns = "";
    for (var name in shaders)
	fns += "function " + name + "(id,size) { this.__name__ = '" + name + "'; this.__shader__ = true; this.__id__ = id || ('unnamed_' + this.__name__); this.__size__ = size;};";
    return fns;
}

function remapTree(shader,shaders) {
    var attr = {
	uniforms:{},
	others:{},
	children:{}
    };
    var origin = shaders[shader.__name__];
    if (!origin) {
	console.log("Undefined shader");
	return;
    }
    for (var name in shader) {
	var param = shader[name];
	if (name.slice(0,2) == '__') continue; //private blah
	console.log(origin);
	if (param && param.__shader__) { 
	    attr.children[name] = remapTree(param,shaders)
	} else if (origin.parseData.params[name].qual == "uniform") {
	    attr.uniforms[name] = param;
	} else {
	    attr.others[name] = param;
	}
    }
    console.log(shader);
    var n = new ShaderInstance(shader.__name__,
			       shader.__id__,
			       origin,
			       attr,
			       shader.__size__);
    console.log(n);
    return n;
}