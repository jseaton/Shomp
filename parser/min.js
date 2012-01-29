/* Jison generated parser */
var min = (function(){

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"translation_unit":4,"EOF":5,"variable_identifier":6,"IDENTIFIER":7,"primary_expression":8,"LEFT_PAREN":9,"expression":10,"RIGHT_PAREN":11,"postfix_expression":12,"function_call":13,"integer_expression":14,"function_call_generic":15,"function_call_header_with_parameters":16,"function_call_header_no_parameters":17,"function_call_header":18,"VOID":19,"assignment_expression":20,"COMMA":21,"function_identifier":22,"constructor_identifier":23,"INT":24,"unary_expression":25,"conditional_expression":26,"assignment_operator":27,"EQUAL":28,"constant_expression":29,"declaration":30,"function_prototype":31,"SEMICOLON":32,"init_declarator_list":33,"PRECISION":34,"precision_qualifier":35,"type_specifier_no_prec":36,"function_declarator":37,"function_header":38,"function_header_with_parameters":39,"parameter_declaration":40,"fully_specified_type":41,"parameter_declarator":42,"type_specifier":43,"LEFT_BRACKET":44,"RIGHT_BRACKET":45,"type_qualifier":46,"parameter_qualifier":47,"parameter_type_specifier":48,"single_declaration":49,"initializer":50,"declaration_statement":51,"statement_no_new_scope":52,"compound_statement_with_scope":53,"simple_statement":54,"expression_statement":55,"selection_statement":56,"iteration_statement":57,"jump_statement":58,"LEFT_BRACE":59,"RIGHT_BRACE":60,"statement_list":61,"statement_with_scope":62,"compound_statement_no_new_scope":63,"external_declaration":64,"function_definition":65,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"IDENTIFIER",9:"LEFT_PAREN",11:"RIGHT_PAREN",19:"VOID",21:"COMMA",24:"INT",28:"EQUAL",32:"SEMICOLON",34:"PRECISION",35:"precision_qualifier",44:"LEFT_BRACKET",45:"RIGHT_BRACKET",46:"type_qualifier",56:"selection_statement",57:"iteration_statement",58:"jump_statement",59:"LEFT_BRACE",60:"RIGHT_BRACE"},
productions_: [0,[3,2],[6,1],[8,1],[8,3],[12,1],[12,1],[14,1],[13,1],[15,2],[15,2],[17,2],[17,1],[16,2],[16,3],[18,2],[22,1],[22,1],[23,1],[25,1],[26,1],[20,1],[20,3],[27,1],[10,1],[29,1],[30,2],[30,2],[30,4],[31,2],[37,1],[37,1],[39,2],[39,3],[38,3],[42,2],[42,5],[40,3],[40,2],[40,3],[40,2],[47,0],[48,1],[48,4],[33,1],[49,1],[49,2],[49,4],[41,1],[43,1],[36,1],[50,1],[51,1],[52,1],[52,1],[54,1],[54,1],[54,1],[54,1],[54,1],[53,2],[53,3],[62,1],[62,1],[63,2],[63,3],[61,1],[61,2],[55,1],[55,2],[4,1],[4,2],[64,1],[64,1],[65,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 27:
	    yy.params.push($$[$0-1]);
	  
break;
case 48: this.$ = $$[$0]; 
break;
case 49: this.$ = {type:$$[$0]}; 
break;
case 69: console.log("Expression statement!"); 
break;
}
},
table: [{3:1,4:2,24:[1,16],30:5,31:6,33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,64:3,65:4},{1:[3]},{5:[1,17],24:[1,16],30:5,31:6,33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,64:18,65:4},{5:[2,70],24:[2,70],34:[2,70]},{5:[2,72],24:[2,72],34:[2,72]},{5:[2,73],24:[2,73],34:[2,73]},{32:[1,20],59:[1,21],63:19},{32:[1,22]},{35:[1,23]},{11:[1,24]},{32:[2,44]},{11:[2,30],24:[2,41],40:25,46:[1,26],47:27},{11:[2,31],21:[1,28]},{7:[1,29],32:[2,45]},{7:[2,48],32:[2,48]},{7:[2,49],11:[2,49],21:[2,49],32:[2,49],44:[2,49]},{7:[2,50],11:[2,50],21:[2,50],32:[2,50],44:[2,50]},{1:[2,1]},{5:[2,71],24:[2,71],34:[2,71]},{5:[2,74],24:[2,74],34:[2,74]},{5:[2,26],7:[2,26],9:[2,26],24:[2,26],32:[2,26],34:[2,26],56:[2,26],57:[2,26],58:[2,26],59:[2,26],60:[2,26]},{6:51,7:[1,55],8:49,9:[1,52],10:43,12:48,13:50,15:53,16:56,17:57,18:58,20:45,22:59,23:60,24:[1,54],25:47,26:46,30:41,31:44,32:[1,42],33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,51:36,52:32,53:33,54:34,55:37,56:[1,38],57:[1,39],58:[1,40],59:[1,35],60:[1,30],61:31},{5:[2,27],7:[2,27],9:[2,27],24:[2,27],32:[2,27],34:[2,27],56:[2,27],57:[2,27],58:[2,27],59:[2,27],60:[2,27]},{24:[1,16],36:61},{32:[2,29],59:[2,29]},{11:[2,32],21:[2,32]},{24:[2,41],47:62},{24:[1,16],36:15,42:63,43:65,48:64},{24:[2,41],40:66,46:[1,26],47:27},{9:[1,68],28:[1,67],32:[2,46]},{5:[2,64],24:[2,64],34:[2,64]},{6:51,7:[1,55],8:49,9:[1,52],10:43,12:48,13:50,15:53,16:56,17:57,18:58,20:45,22:59,23:60,24:[1,54],25:47,26:46,30:41,31:44,32:[1,42],33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,51:36,52:70,53:33,54:34,55:37,56:[1,38],57:[1,39],58:[1,40],59:[1,35],60:[1,69]},{7:[2,66],9:[2,66],24:[2,66],32:[2,66],34:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],60:[2,66]},{7:[2,53],9:[2,53],24:[2,53],32:[2,53],34:[2,53],56:[2,53],57:[2,53],58:[2,53],59:[2,53],60:[2,53]},{7:[2,54],9:[2,54],24:[2,54],32:[2,54],34:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[2,54],60:[2,54]},{6:51,7:[1,55],8:49,9:[1,52],10:43,12:48,13:50,15:53,16:56,17:57,18:58,20:45,22:59,23:60,24:[1,54],25:47,26:46,30:41,31:44,32:[1,42],33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,51:36,52:32,53:33,54:34,55:37,56:[1,38],57:[1,39],58:[1,40],59:[1,35],60:[1,71],61:72},{7:[2,55],9:[2,55],24:[2,55],32:[2,55],34:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],60:[2,55]},{7:[2,56],9:[2,56],24:[2,56],32:[2,56],34:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],60:[2,56]},{7:[2,57],9:[2,57],24:[2,57],32:[2,57],34:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],60:[2,57]},{7:[2,58],9:[2,58],24:[2,58],32:[2,58],34:[2,58],56:[2,58],57:[2,58],58:[2,58],59:[2,58],60:[2,58]},{7:[2,59],9:[2,59],24:[2,59],32:[2,59],34:[2,59],56:[2,59],57:[2,59],58:[2,59],59:[2,59],60:[2,59]},{7:[2,52],9:[2,52],24:[2,52],32:[2,52],34:[2,52],56:[2,52],57:[2,52],58:[2,52],59:[2,52],60:[2,52]},{7:[2,68],9:[2,68],24:[2,68],32:[2,68],34:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],60:[2,68]},{32:[1,73]},{32:[1,20]},{11:[2,24],32:[2,24]},{11:[2,21],21:[2,21],32:[2,21]},{11:[2,20],21:[2,20],27:74,28:[1,75],32:[2,20]},{11:[2,19],21:[2,19],28:[2,19],32:[2,19],45:[2,19]},{11:[2,5],21:[2,5],28:[2,5],32:[2,5],45:[2,5]},{11:[2,6],21:[2,6],28:[2,6],32:[2,6],45:[2,6]},{11:[2,3],21:[2,3],28:[2,3],32:[2,3],45:[2,3]},{6:51,7:[1,55],8:49,9:[1,52],10:76,12:48,13:50,15:53,16:56,17:57,18:58,20:45,22:59,23:60,24:[1,77],25:47,26:46},{11:[2,8],21:[2,8],28:[2,8],32:[2,8],45:[2,8]},{7:[2,50],9:[2,50],32:[2,50]},{9:[2,2],11:[2,2],21:[2,2],28:[2,2],32:[2,2],45:[2,2]},{11:[1,78],21:[1,79]},{11:[1,80]},{6:51,7:[1,55],8:49,9:[1,52],11:[2,12],12:48,13:50,15:53,16:56,17:57,18:58,19:[1,82],20:81,22:59,23:60,24:[1,77],25:47,26:46},{9:[1,83]},{9:[2,16]},{32:[1,84]},{24:[1,16],36:15,42:85,43:65,48:86},{11:[2,38],21:[2,38]},{11:[2,40],21:[2,40]},{7:[1,87],11:[2,42],21:[2,42],44:[1,88]},{11:[2,33],21:[2,33]},{6:51,7:[1,55],8:49,9:[1,52],12:48,13:50,15:53,16:56,17:57,18:58,20:90,22:59,23:60,24:[1,77],25:47,26:46,50:89},{11:[2,34],24:[2,34],46:[2,34]},{5:[2,65],24:[2,65],34:[2,65]},{7:[2,67],9:[2,67],24:[2,67],32:[2,67],34:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],60:[2,67]},{7:[2,60],9:[2,60],24:[2,60],32:[2,60],34:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],60:[2,60]},{6:51,7:[1,55],8:49,9:[1,52],10:43,12:48,13:50,15:53,16:56,17:57,18:58,20:45,22:59,23:60,24:[1,54],25:47,26:46,30:41,31:44,32:[1,42],33:7,34:[1,8],36:15,37:9,38:11,39:12,41:13,43:14,49:10,51:36,52:70,53:33,54:34,55:37,56:[1,38],57:[1,39],58:[1,40],59:[1,35],60:[1,91]},{7:[2,69],9:[2,69],24:[2,69],32:[2,69],34:[2,69],56:[2,69],57:[2,69],58:[2,69],59:[2,69],60:[2,69]},{6:51,7:[1,55],8:49,9:[1,52],12:48,13:50,15:53,16:56,17:57,18:58,20:92,22:59,23:60,24:[1,77],25:47,26:46},{7:[2,23],9:[2,23],24:[2,23]},{11:[1,93]},{9:[2,18]},{11:[2,9],21:[2,9],28:[2,9],32:[2,9],45:[2,9]},{6:51,7:[1,55],8:49,9:[1,52],12:48,13:50,15:53,16:56,17:57,18:58,20:94,22:59,23:60,24:[1,77],25:47,26:46},{11:[2,10],21:[2,10],28:[2,10],32:[2,10],45:[2,10]},{11:[2,13],21:[2,13]},{11:[2,11]},{7:[2,15],9:[2,15],11:[2,15],19:[2,15],24:[2,15]},{5:[2,28],7:[2,28],9:[2,28],24:[2,28],32:[2,28],34:[2,28],56:[2,28],57:[2,28],58:[2,28],59:[2,28],60:[2,28]},{11:[2,37],21:[2,37]},{11:[2,39],21:[2,39]},{11:[2,35],21:[2,35],44:[1,95]},{6:51,7:[1,55],8:49,9:[1,52],12:48,13:50,15:53,16:56,17:57,18:58,22:59,23:60,24:[1,77],25:98,26:97,29:96},{32:[2,47]},{32:[2,51]},{7:[2,61],9:[2,61],24:[2,61],32:[2,61],34:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],60:[2,61]},{11:[2,22],21:[2,22],32:[2,22]},{11:[2,4],21:[2,4],28:[2,4],32:[2,4],45:[2,4]},{11:[2,14],21:[2,14]},{6:51,7:[1,55],8:49,9:[1,52],12:48,13:50,15:53,16:56,17:57,18:58,22:59,23:60,24:[1,77],25:98,26:97,29:99},{45:[1,100]},{45:[2,25]},{45:[2,20]},{45:[1,101]},{11:[2,43],21:[2,43]},{11:[2,36],21:[2,36]}],
defaultActions: {10:[2,44],17:[2,1],60:[2,16],77:[2,18],82:[2,11],89:[2,47],90:[2,51],97:[2,25],98:[2,20]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* whitespace */
break;
case 1:return 'ATTRIBUTE';
break;
case 2:return 'CONST';
break;
case 3:return 'BOOL';
break;
case 4:return 'FLOAT';
break;
case 5:return 24;
break;
case 6:return 'BREAK';
break;
case 7:return 'CONTINUE';
break;
case 8:return 'DO';
break;
case 9:return 'ELSE';
break;
case 10:return 'FOR';
break;
case 11:return 'IF';
break;
case 12:return 'DISCARD';
break;
case 13:return 'RETURN';
break;
case 14:return 'BVEC2';
break;
case 15:return 'BVEC3';
break;
case 16:return 'BVEC4';
break;
case 17:return 'IVEC2';
break;
case 18:return 'IVEC3';
break;
case 19:return 'IVEC4';
break;
case 20:return 'VEC2';
break;
case 21:return 'VEC3';
break;
case 22:return 'VEC4';
break;
case 23:return 'MAT2';
break;
case 24:return 'MAT3';
break;
case 25:return 'MAT4';
break;
case 26:return 'IN';
break;
case 27:return 'OUT';
break;
case 28:return 'INOUT';
break;
case 29:return 'UNIFORM';
break;
case 30:return 'VARYING';
break;
case 31:return 'SAMPLER2D';
break;
case 32:return 'SAMPLERCUBE';
break;
case 33:return 'STRUCT';
break;
case 34:return 19;
break;
case 35:return 'WHILE';
break;
case 36:return 'INVARIANT';
break;
case 37:return 'HIGH_PRECISION';
break;
case 38:return 'MEDIUM_PRECISION';
break;
case 39:return 'LOW_PRECISION';
break;
case 40:return 34; /*'magic_type_name'  return 'TYPE_NAME';*/
break;
case 41:return 'FIELD_SELECTION'; 
break;
case 42:return 'LEFT_OP';
break;
case 43:return 'RIGHT_OP';
break;
case 44:return 'INC_OP';
break;
case 45:return 'DEC_OP';
break;
case 46:return 'LE_OP';
break;
case 47:return 'GE_OP';
break;
case 48:return 'EQ_OP';
break;
case 49:return 'NE_OP';
break;
case 50:return 'AND_OP';
break;
case 51:return 'OR_OP'; /* '^^' XOR_OP TODO: is this valid? */
break;
case 52:return 'MUL_ASSIGN';
break;
case 53:return 'DIV_ASSIGN';
break;
case 54:return 'ADD_ASSIGN';
break;
case 55:return 'MOD_ASSIGN'; /* reserved LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN XOR_ASSIGN OR_ASSIGN */
break;
case 56:return 'SUB_ASSIGN';
break;
case 57:return 9;
break;
case 58:return 11;
break;
case 59:return 44;
break;
case 60:return 45;
break;
case 61:return 59;
break;
case 62:return 60;
break;
case 63:return 'DOT';
break;
case 64:return 21;
break;
case 65:return 'COLON';
break;
case 66:return 28;
break;
case 67:return 32;
break;
case 68:return 'BANG';
break;
case 69:return 'DASH';
break;
case 70:return 'TILDE';
break;
case 71:return 'PLUS';
break;
case 72:return 'STAR';
break;
case 73:return 'SLASH';
break;
case 74:return 'PERCENT';
break;
case 75:return 'LEFT_ANGLE';
break;
case 76:return 'RIGHT_ANGLE';
break;
case 77:return 'VERTICAL_BAR';
break;
case 78:return 'CARET';
break;
case 79:return 'AMPERSAND';
break;
case 80:return 'QUESTION';
break;
case 81:return 'BOOLCONSTANT';
break;
case 82:return 'BOOLCONSTANT';
break;
case 83:return 7; /* identifiers of the form identifier : nondigit | identifier nondigit | identifier digit */
break;
case 84:return 'FLOATCONSTANT'; /* float constants (conveniently the same format as accepted by parseFloat) floating-constant : fractional-constant [exponent-part] | digit-sequence exponent-part */
break;
case 85:return 'INTCONSTANT'; /* integer constants (same as parseInt) integer-constant : decimal-constant | octal-constant | hexadecimal-constant */
break;
case 86:return 5;
break;
}
};
lexer.rules = [/^\s+/,/^attribute\b/,/^const\b/,/^bool\b/,/^float\b/,/^int\b/,/^break\b/,/^continue\b/,/^do\b/,/^else\b/,/^for\b/,/^if\b/,/^discard\b/,/^return\b/,/^bvec2\b/,/^bvec3\b/,/^bvec4\b/,/^ivec2\b/,/^ivec3\b/,/^ivec4\b/,/^vec2\b/,/^vec3\b/,/^vec4\b/,/^mat2\b/,/^mat3\b/,/^mat4\b/,/^in\b/,/^out\b/,/^inout\b/,/^uniform\b/,/^varying\b/,/^sampler2D\b/,/^samplercube\b/,/^struct\b/,/^void\b/,/^while\b/,/^invariant\b/,/^highp\b/,/^mediump\b/,/^lowp\b/,/^precision\b/,/^field_selection\b/,/^<</,/^>>/,/^\+\+/,/^--/,/^<=/,/^>=/,/^==/,/^!=/,/^&&/,/^\|\|/,/^\*=/,/^\/=/,/^\+=/,/^%=/,/^-=/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\./,/^,/,/^:/,/^=/,/^;/,/^!/,/^-/,/^~/,/^\+/,/^\*/,/^\//,/^%/,/^</,/^>/,/^\|/,/^\^/,/^&/,/^\?/,/^true\b/,/^false\b/,/^[a-zA-Z\_]+[a-zA-Z0-9]*/,/^([0-9]+\.[0-9]+|[0-9]+\.|\.[0-9]+)((e|E)(\+|-)?[0-9]+)?|[0-9]+(e|E)(\+|-)?[0-9]+/,/^[1-9][0-9]*|0[0-7]+|0(x|X)[0-9a-fA-F]+|0\b/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = min;
exports.parse = function () { return min.parse.apply(min, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}