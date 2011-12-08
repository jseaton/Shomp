p = require('./glsl').parser
p.yy =  {structs:{},params:[],errors:[]};

repl = require("repl");
repl.start();
