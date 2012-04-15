jquery = require('jquery');

parser.yy =  {structs:{},params:[],errors:[]};

function parse(s) {
    parser.yy = {structs:{},params:[],errors:[]};
    parser.parse(s);
    return {structs:parser.yy.structs,params:jquery.extend.apply({},parser.yy.params)};
}

var tests = { uint:
	      { glsl: "uniform int x;",
		answer: { x: {type:'int',qual:'uniform'} }
	      },
	      ufloat:
	      { glsl: "uniform float y;",
		answer: { y: {type:'float',qual:'uniform'} }
	      },
	      vlvec4:
	      { glsl: "uniform float y; varying lowp vec4 z;",
		answer: { z: {type:'vec4',qual:'varying',prec:'lowp'} }
	      },
	      many:
	      { glsl: "uniform int x; varying lowp vec4 z; highp mat3 y; uniform sampler2D s;",
		answer: { x: {type:'int',qual:'uniform'},
			  y: {type:'mat3',prec:'highp'},
			  z: {type:'vec4',qual:'varying',prec:'lowp'},
			  s: {type:'sampler2D',qual:'uniform'}
			}
	      },
	      vmmat4:
	      { glsl: "varying mediump mat4 x;",
		answer: { x:  {type:'mat4',qual:'varying',prec:'mediump'} }
	      },
	      abool:
	      { glsl: "attribute bool y;",
		answer: { y:  {type:'bool',qual:'attribute'} }
	      }
	    };


for (i in tests) {
    test(i,function() {
	var result = {structs:{},params:{}};
	var parses = true;
	try {
	    result = parse(tests[i].glsl);
	} catch (e) {
	    if (tests[i].fails != undefined) {
		ok(true,"Correctly fails to parse");
		return;
	    } else {
		ok(false,"Successfully parses");
		parses = false;
	    }
	}
	if (parses) ok(true,"Successfully parses");
	for (var j in tests[i].answer) {
	    deepEqual(result.params[j],tests[i].answer[j],"One correct parameter");
	    break;
	}
	var k = 0;
	for (var j in tests[i].answer) {
	    if (result.params[j]) k++; 
	}
	equal(k,Object.keys(tests[i].answer).length,"Correct parameter names");
	deepEqual(Object.keys(result.params).sort(),Object.keys(tests[i].answer).sort(),"Correct parameter names only");
	deepEqual(result.params,tests[i].answer,"Correct parameters");
	deepEqual(result.structs,tests[i].structs||{},"Correct structs");
    });
}