function evalTree(text,shaders) {
    eval(genShaderFunctions(shaders));
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
	args[i] = shader[i].__shader__ ? remapTree(shader[i],shaders) : shader[i];
    }
    return new ShaderInstance(shader.__name__,shaders[shader.__name__],args);
}