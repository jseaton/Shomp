/* NOTICE This parser is based directly upon the token / grammar specification for GLSL ES 1.0.17 
 * by the Khronos Group available at http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
 */

/* ~~~~~~~ Token Defns ~~~~~~~~ */

%lex

%%
\s+		/* whitespace */
'attribute'	return 'ATTRIBUTE';
'const'		return 'CONST';
'bool'		return 'BOOL';
'float' 	return 'FLOAT';
'int'		return 'INT';
'break'		return 'BREAK';
'continue'	return 'CONTINUE';
'do'		return 'DO';
'else'		return 'ELSE';
'for'		return 'FOR';
'if'		return 'IF';
'discard'	return 'DISCARD';
'return'	return 'RETURN';
'bvec2'		return 'BVEC2';
'bvec3'		return 'BVEC3';
'bvec4'		return 'BVEC4';
'ivec2'		return 'IVEC2';
'ivec3'		return 'IVEC3';
'ivec4'		return 'IVEC4';
'vec2'		return 'VEC2';
'vec3'		return 'VEC3';
'vec4'		return 'VEC4';
'mat2'		return 'MAT2';
'mat3'		return 'MAT3';
'mat4'		return 'MAT4';
'in'		return 'IN';
'out'		return 'OUT';
'inout'		return 'INOUT';
'uniform'	return 'UNIFORM';
'varying'	return 'VARYING';
'sampler2D'	return 'SAMPLER2D';
'samplercube'	return 'SAMPLERCUBE';
'struct'	return 'STRUCT';
'void'		return 'VOID';
'while'		return 'WHILE';
'invariant' return 'INVARIANT';
'highp' return 'HIGH_PRECISION';
'mediump' return 'MEDIUM_PRECISION';
'lowp' return 'LOW_PRECISION';
'precision' return 'PRECISION';
'magic_type_name'  return 'TYPE_NAME';
[a-zA-Z\_]+[0-9]* return 'IDENTIFIER'; /* identifiers of the form identifier : nondigit | identifier nondigit | identifier digit */
([0-9]+'.'[0-9]+|[0-9]+'.'|'.'[0-9]+)(('e'|'E')('+'|'-')?[0-9]+)?|[0-9]+('e'|'E')('+'|'-')?[0-9]+ return 'FLOATCONSTANT'; /* float constants (conveniently the same format as accepted by parseFloat) floating-constant : fractional-constant [exponent-part] | digit-sequence exponent-part */
[1-9][0-9]*|'0'[0-7]+|'0'('x'|'X')[0-9a-fA-F]+ return 'INTCONSTANT'; /* integer constants (same as parseInt) integer-constant : decimal-constant | octal-constant | hexadecimal-constant */
'true'|'false' return 'BOOLCONSTANT';
'field_selection' return 'FIELD_SELECTION'; 
'<<' return 'LEFT_OP';
'>>' return 'RIGHT_OP';
'++' return 'INC_OP';
'--' return 'DEC_OP';
'<=' return 'LE_OP';
'>=' return 'GE_OP';
'==' return 'EQ_OP';
'!=' return 'NE_OP';
'&&' return 'AND_OP';
'||' return 'OR_OP'; /* '^^' XOR_OP TODO: is this valid? */
'*=' return 'MUL_ASSIGN';
'/=' return 'DIV_ASSIGN';
'+=' return 'ADD_ASSIGN';
'%=' return 'MOD_ASSIGN'; /* reserved LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN XOR_ASSIGN OR_ASSIGN */
'-=' return 'SUB_ASSIGN';
'(' return 'LEFT_PAREN';
')' return 'RIGHT_PAREN';
'[' return 'LEFT_BRACKET';
']' return 'RIGHT_BRACKET';
'{' return 'LEFT_BRACE';
'}' return 'RIGHT_BRACE';
'.' return 'DOT';
',' return 'COMMA';
':' return 'COLON';
'=' return 'EQUAL';
';' return 'SEMICOLON';
'!' return 'BANG';
'-' return 'DASH';
'~' return 'TILDE';
'+' return 'PLUS';
'*' return 'STAR';
'/' return 'SLASH';
'%' return 'PERCENT';
'<' return 'LEFT_ANGLE';
'>' return 'RIGHT_ANGLE';
'|' return 'VERTICAL_BAR';
'^' return 'CARET';
'&' return 'AMPERSAND';
'?' return 'QUESTION';
'invariant' return 'INVARIANT';
'highp' return 'HIGH_PRECISION';
'mediump' return 'MEDIUM_PRECISION';
'lowp' return 'LOW_PRECISION';
'precision' return 'PRECISION';

<<EOF>> return 'EOF';

/lex

%start expressions

%% /* ~~~~~~~~~ Grammar ~~~~~~~~~ */

expressions: 
	translation_unit EOF
	;

variable_identifier:
        IDENTIFIER
	;

primary_expression:
	variable_identifier 
        | INTCONSTANT { $$ = parseInt($1); }
        | FLOATCONSTANT { $$ = parseFloat($1); }
        | BOOLCONSTANT { $$ = $1 == 'true'; }
        | LEFT_PAREN expression RIGHT_PAREN
	;

postfix_expression:
        primary_expression 
        | postfix_expression LEFT_BRACKET integer_expression RIGHT_BRACKET 
        | function_call 
        /* | postfix_expression DOT FIELD_SELECTION TODO */
        | postfix_expression INC_OP 
        | postfix_expression DEC_OP
	;
 
integer_expression:
        expression
	;
 
function_call:
        function_call_generic
	;
 
function_call_generic:
        function_call_header_with_parameters RIGHT_PAREN 
        | function_call_header_no_parameters RIGHT_PAREN
	;

function_call_header_no_parameters:
        function_call_header VOID 
        | function_call_header
	;
 
function_call_header_with_parameters:
        function_call_header assignment_expression 
        | function_call_header_with_parameters COMMA assignment_expression 
	;

function_call_header:
        function_identifier LEFT_PAREN 
	;

function_identifier:
        constructor_identifier 
        | IDENTIFIER
	;

constructor_identifier:
        FLOAT 
        | INT 
        | BOOL 
        | VEC2 
        | VEC3 
        | VEC4 
        | BVEC2
        | BVEC3
        | BVEC4
        | IVEC2
        | IVEC3
        | IVEC4
        | MAT2
        | MAT3
        | MAT4
	| TYPE_NAME
	;

unary_expression:
        postfix_expression 
        | INC_OP unary_expression 
        | DEC_OP unary_expression 
        | unary_operator unary_expression 
	;

unary_operator:
        PLUS 
        | DASH 
        | BANG 
        | TILDE
	;

multiplicative_expression:
        unary_expression 
        | multiplicative_expression STAR unary_expression
        | multiplicative_expression SLASH unary_expression
        | multiplicative_expression PERCENT unary_expression
	;

additive_expression:
        multiplicative_expression 
        | additive_expression PLUS multiplicative_expression 
        | additive_expression DASH multiplicative_expression
	;
 
shift_expression:
        additive_expression 
        | shift_expression LEFT_OP additive_expression
        | shift_expression RIGHT_OP additive_expression
	;

relational_expression:
        shift_expression 
        | relational_expression LEFT_ANGLE shift_expression 
        | relational_expression RIGHT_ANGLE shift_expression 
        | relational_expression LE_OP shift_expression 
        | relational_expression GE_OP shift_expression
	;
 
equality_expression:
        relational_expression 
        | equality_expression EQ_OP relational_expression 
        | equality_expression NE_OP relational_expression
	;

and_expression:
        equality_expression 
        | and_expression AMPERSAND equality_expression
	;

exclusive_or_expression:
        and_expression 
        | exclusive_or_expression CARET and_expression
	;

inclusive_or_expression:
        exclusive_or_expression 
        | inclusive_or_expression VERTICAL_BAR exclusive_or_expression
	;

logical_and_expression:
        inclusive_or_expression 
        | logical_and_expression AND_OP inclusive_or_expression
	;

/* No operator defined!
logical_xor_expression:
        logical_and_expression 
        | logical_xor_expression XOR_OP logical_and_expression 
	;
*/

logical_or_expression:
        /* logical_xor_expression Not used */
	logical_and_expression
        | logical_or_expression OR_OP logical_and_expression 
	;

conditional_expression:
        logical_or_expression 
        | logical_or_expression QUESTION expression COLON assignment_expression 
	;

assignment_expression:
        conditional_expression 
        | unary_expression assignment_operator assignment_expression 
	;

assignment_operator:
        EQUAL 
        | MUL_ASSIGN
        | DIV_ASSIGN
        | MOD_ASSIGN
        | ADD_ASSIGN 
        | SUB_ASSIGN 
/~      | LEFT_ASSIGN  Reserved
        | RIGHT_ASSIGN
        | AND_ASSIGN  
        | XOR_ASSIGN  
        | OR_ASSIGN ~/
	;

expression:
        assignment_expression 
        | expression COMMA assignment_expression 
	;

constant_expression:
        conditional_expression
	;

declaration:
        function_prototype SEMICOLON
        | init_declarator_list SEMICOLON  { console.log("!" + JSON.stringify($$)); }
        | PRECISION precision_qualifier type_specifier_no_prec SEMICOLON
	;

function_prototype:
        function_declarator RIGHT_PAREN 
	;

function_declarator:
        function_header 
        | function_header_with_parameters 
	;

function_header_with_parameters:
        function_header parameter_declaration 
        | function_header_with_parameters COMMA parameter_declaration 
	;

function_header:
        fully_specified_type IDENTIFIER LEFT_PAREN 
	;

parameter_declarator:
        type_specifier IDENTIFIER
        | type_specifier IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
	;

parameter_declaration:
        type_qualifier parameter_qualifier parameter_declarator
        | parameter_qualifier parameter_declarator
        | type_qualifier parameter_qualifier parameter_type_specifier
        | parameter_qualifier parameter_type_specifier
	;

parameter_qualifier:
        /* empty */
        | IN 
        | OUT 
        | INOUT
	;

parameter_type_specifier:
        type_specifier
        | type_specifier LEFT_BRACKET constant_expression RIGHT_BRACKET
	;

init_declarator_list:
        single_declaration
        | init_declarator_list COMMA IDENTIFIER { $$ = $1.concat([[$3]]); }
        | init_declarator_list COMMA IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET { $$ = $1.concat([[$3,$5]]); }
        | init_declarator_list COMMA IDENTIFIER EQUAL initializer { $$ = $1.concat([[$3,null,$5]]); }
	;

single_declaration:
        fully_specified_type 
        | fully_specified_type IDENTIFIER { $$ = [$1,[$2]]; }
        | fully_specified_type IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET { $$ = [$1,[$2,$4]] }
        | fully_specified_type IDENTIFIER EQUAL initializer { $$ = [$1,[$2,null,$4]]; }
        | INVARIANT IDENTIFIER   /* TODO Vertex only. */
	;

fully_specified_type:
        type_specifier { $$ = ['',$1]; } 
        | type_qualifier type_specifier { $$ = [$1, $2]; }
	; 

type_qualifier:
        CONST 
        | ATTRIBUTE   /* TODO Vertex only. */
        | VARYING 
        | INVARIANT VARYING
        | UNIFORM
	;

type_specifier:
        type_specifier_no_prec { $$ = [null,$1]; }
        | precision_qualifier type_specifier_no_prec { $$ = [$1, $2]; }
	;

type_specifier_no_prec:
        VOID 
        | FLOAT 
        | INT 
        | BOOL 
        | VEC2 
        | VEC3 
        | VEC4 
        | BVEC2 
        | BVEC3 
        | BVEC4 
        | IVEC2 
        | IVEC3 
        | IVEC4 
        | MAT2
        | MAT3
        | MAT4
        | SAMPLER2D
        | SAMPLERCUBE
        | struct_specifier
        | TYPE_NAME
	;
 
precision_qualifier:
        HIGH_PRECISION
        | MEDIUM_PRECISION
        | LOW_PRECISION
	;

struct_specifier:
        STRUCT IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE { 
	lexer.rules[36] = new RegExp(lexer.rules[36].toString().slice(1,-3).toString() + "\\b|^" + $2 + "\\b"); 
	$$ = $4;
	if (typeof lexer.structs == 'undefined') { lexer.structs = {}; }
	lexer.structs[$2] = $4;
	}
        | STRUCT LEFT_BRACE struct_declaration_list RIGHT_BRACE { $$ = $3; }
	;

struct_declaration_list:
        struct_declaration
        | struct_declaration_list struct_declaration { $$ = [$1].concat([$2]); }
	;

struct_declaration:
        type_specifier struct_declarator_list SEMICOLON { $$ = [$1,$2]; }
	;

struct_declarator_list:
        struct_declarator 
        | struct_declarator_list COMMA struct_declarator { $$ = $1.concat([$2]); }
	;
 
struct_declarator:
        IDENTIFIER { $$ = [$1]; }
        | IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET { $$ = [$1,$3]; }
	;
 
initializer:
        assignment_expression 
	;

declaration_statement:
        declaration 
	;

statement_no_new_scope:
        compound_statement_with_scope
        | simple_statement
	;
 
simple_statement:
        declaration_statement 
        | expression_statement 
        | selection_statement 
        | iteration_statement 
        | jump_statement
	;
 
compound_statement_with_scope:
        LEFT_BRACE RIGHT_BRACE 
        | LEFT_BRACE statement_list RIGHT_BRACE
	;
 
statement_with_scope:
        compound_statement_no_new_scope 
        | simple_statement
	;
 
compound_statement_no_new_scope:
        LEFT_BRACE RIGHT_BRACE 
        | LEFT_BRACE statement_list RIGHT_BRACE
	;
 
statement_list:
        statement_no_new_scope
        | statement_list statement_no_new_scope
	;

expression_statement:
        SEMICOLON 
        expression SEMICOLON
	;

selection_statement:
        IF LEFT_PAREN expression RIGHT_PAREN selection_rest_statement 
	;

selection_rest_statement:
        statement_with_scope ELSE statement_with_scope 
        | statement_with_scope
	;

condition:
        expression 
        | fully_specified_type IDENTIFIER EQUAL initializer 
	;

iteration_statement:
        WHILE LEFT_PAREN condition RIGHT_PAREN statement_no_new_scope 
        | DO statement_with_scope WHILE LEFT_PAREN expression RIGHT_PAREN SEMICOLON 
        | FOR LEFT_PAREN for_init_statement for_rest_statement RIGHT_PAREN statement_no_new_scope 
	;

for_init_statement:
        expression_statement 
        | declaration_statement 
	;

conditionopt:
        /* empty */
	| condition 
	;

for_rest_statement:
        conditionopt SEMICOLON 
        | conditionopt SEMICOLON expression 
	;

jump_statement:
        CONTINUE SEMICOLON 
        | BREAK SEMICOLON 
        | RETURN SEMICOLON 
        | RETURN expression SEMICOLON 
        | DISCARD SEMICOLON   /* TODO Fragment shader only. */
	;

translation_unit:
        external_declaration 
        | translation_unit external_declaration
	;

external_declaration:
        function_definition 
        | declaration;

function_definition:
        function_prototype compound_statement_no_new_scope
	;
