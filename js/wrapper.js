function evalTree(text,shaders) {
    eval(genShaderFunctions(shaders));

    vec2 = GLOW.Vector2;
    vec3 = GLOW.Vector3;
    vec4 = GLOW.Vector4;

    mat3 = GLOW.Matrix3;
    mat4 = GLOW.Matrix4;

    function sampler2D(url) { GLOW.Texture.call(this,{url:url}); }

    eval(text);
    return output;
}

function genShaderFunctions(shaders) {
    var fns = "";
    for (name in shaders)
	fns += "function " + name + "() { this.__name__ = '" + name + "'; this.__shader__ = true;};";
    return fns;
}

function remapTree(shader,shaders) {
    var args = {};
    for (i in shader) {
	if (i == '__name__' || i == '__shader__') continue;
	console.log(shader);
	console.log(i);
	console.log(shader[i]);
	args[i] = shader[i] && shader[i].__shader__ ? remapTree(shader[i],shaders) : shader[i];
    }
    return new ShaderInstance(shader.__name__,shaders[shader.__name__],args);
}