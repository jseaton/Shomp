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
'precision' return 'PRECISION'; /*'magic_type_name'  return 'TYPE_NAME';*/
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
'true' return 'BOOLCONSTANT';
'false' return 'BOOLCONSTANT';
[a-zA-Z\_]+[a-zA-Z0-9]* return 'IDENTIFIER'; /* identifiers of the form identifier : nondigit | identifier nondigit | identifier digit */
([0-9]+'.'[0-9]+|[0-9]+'.'|'.'[0-9]+)(('e'|'E')('+'|'-')?[0-9]+)?|[0-9]+('e'|'E')('+'|'-')?[0-9]+ return 'FLOATCONSTANT'; /* float constants (conveniently the same format as accepted by parseFloat) floating-constant : fractional-constant [exponent-part] | digit-sequence exponent-part */
[1-9][0-9]*|'0'[0-7]+|'0'('x'|'X')[0-9a-fA-F]+|'0' return 'INTCONSTANT'; /* integer constants (same as parseInt) integer-constant : decimal-constant | octal-constant | hexadecimal-constant */
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
        | LEFT_PAREN expression RIGHT_PAREN
	;

postfix_expression:
        primary_expression
        | function_call
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
        INT
	;

unary_expression:
        postfix_expression 
	;

conditional_expression:
        unary_expression
	;

assignment_expression:
        conditional_expression 
        | unary_expression assignment_operator assignment_expression 
	;

assignment_operator:
        EQUAL
	;

expression:
        assignment_expression 
	;

constant_expression:
        conditional_expression
	;

declaration:
        function_prototype SEMICOLON
        | init_declarator_list SEMICOLON  {
	    yy.params.push($1);
	  }
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
	;

parameter_type_specifier:
        type_specifier
        | type_specifier LEFT_BRACKET constant_expression RIGHT_BRACKET
	;

init_declarator_list:
        single_declaration
	;

single_declaration:
        fully_specified_type 
        | fully_specified_type IDENTIFIER
        | fully_specified_type IDENTIFIER EQUAL initializer
	;

fully_specified_type:
        type_specifier { $$ = $1; } 
	; 

type_specifier:
        type_specifier_no_prec { $$ = {type:$1}; }
	;

type_specifier_no_prec:
        INT 
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
        | expression SEMICOLON { console.log("Expression statement!"); }
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
