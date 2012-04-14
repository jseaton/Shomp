p = require('../parser/glsl').parser
p.yy =  {structs:{},params:[],errors:[]};

function parse(s) {
    p.yy = {structs:{},params:[],errors:[]};
    p.parse(s);
    return {structs:p.yy.structs,params:p.yy.params};
}

