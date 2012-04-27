function TestingShader(vS,fS) {
    this.vertexShader = vS;
    this.fragmentShader = fS;
    blat = true; //TODO this is a horrendous hack
    this.parseData      = parse(this.vertexShader.split('\n').map(function (e) { if (e=='') blat=false; if (blat) {return e;} else {return '';}}).join('\n'));
}

TestingShader.prototype.update = function () {}

function time(f) {
    var start = Date.now();
    f();
    return Date.now() - start;
}

function timeChange(spec) {
    shaders = spec.shaders;
    pipeline = spec.pipeline;
    tree = undefined;
    chain = undefined;

    return time(function() {
	updateShaders();
	updateTree();
	updateChain();
	render();
    });
}

var tests = {
    simple: {
	shaders:  TestingShader("",""),
	pipeline: ""
    }
};

function timeTests() {
    var results = [];
    for (var i in tests)
	results.push(timeChange(tests[i]));
    console.log(results);
}