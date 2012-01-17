p = require('./glsl').parser
p.yy =  {structs:{},params:[],errors:[]};

sym = {};
for (i in p.symbols_) sym[p.symbols_[i]] = i;

lex = function(s) {
    p.lexer.setInput(s);
    list = [];
    while (!p.lexer.done) {
	n = p.lexer.next();
	list.push([p.lexer.match,sym[n]]);
    }
    return list;
}

parse = function(s) {
    p.yy = {structs:{},params:[],errors:[]};
    p.parse(s);
    return {structs:p.yy.structs,params:p.yy.params};
}

repl = require("repl");
repl.start();
