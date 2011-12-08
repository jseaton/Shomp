/* NOTICE This parser is based directly upon the token / grammar specification for GLSL ES 1.0.17 
 * by the Khronos Group available at http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
 */

/* ~~~~~~~ Token Defns ~~~~~~~~ */

%lex

%%
\s+		/* whitespace */
'magic_type_name'|'ladidah'  return 'TYPE_NAME';
[a-zA-Z\_]+[0-9]* return 'IDENTIFIER'; /* identifiers of the form identifier : nondigit | identifier nondigit | identifier digit */

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
	;

postfix_expression:
        primary_expression 
	;
 
integer_expression:
        expression
	;

constructor_identifier:
	TYPE_NAME
	;

unary_expression:
        postfix_expression 
 
	;



multiplicative_expression:
        unary_expression 
 
	;

additive_expression:
        multiplicative_expression 
 
	;
 
shift_expression:
        additive_expression 
 
	;

relational_expression:
        shift_expression 
 
	;
 
equality_expression:
        relational_expression 

	;

and_expression:
        equality_expression 
  
	;

exclusive_or_expression:
        and_expression 
	;

inclusive_or_expression:
        exclusive_or_expression 
	;

logical_and_expression:
        inclusive_or_expression 
	;


logical_or_expression:
        /* logical_xor_expression Not used */
	logical_and_expression
	;

conditional_expression:
        logical_or_expression 
	;

assignment_expression:
        conditional_expression 
	;


expression:
        assignment_expression 
   
	;

constant_expression:
        conditional_expression
	;

declaration:
        function_prototype SEMICOLON 
        | init_declarator_list SEMICOLON 
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
        type_specifier IDENTIFIER { $$ = $2; }
        | type_specifier IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET { $$ = $2; }
	;

parameter_declaration:
        type_qualifier parameter_qualifier parameter_declarator { console.log($3); }
        | parameter_qualifier parameter_declarator { console.log($2); }
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
        | init_declarator_list COMMA IDENTIFIER 
        | init_declarator_list COMMA IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
        | init_declarator_list COMMA IDENTIFIER EQUAL initializer 
	;

single_declaration:
        fully_specified_type 
        | fully_specified_type IDENTIFIER 
        | fully_specified_type IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET 
        | fully_specified_type IDENTIFIER EQUAL initializer 
        | INVARIANT IDENTIFIER   /* TODO Vertex only. */
	;

fully_specified_type:
        type_specifier 
        | type_qualifier type_specifier
	; 

type_qualifier:
        CONST 
        | ATTRIBUTE   /* TODO Vertex only. */
        | VARYING 
        | INVARIANT VARYING
        | UNIFORM 
	;

type_specifier:
        type_specifier_no_prec
        | precision_qualifier type_specifier_no_prec
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
        STRUCT IDENTIFIER LEFT_BRACE struct_declaration_list RIGHT_BRACE { r = $2 + '\b'; console.log(r.toString()); lexer.rules[36] = new RegExp(lexer.rules[36].toString().slice(1,-3).toString() + '|'.toString() + $2.toString() + "\\b".toString()); }
        | STRUCT LEFT_BRACE struct_declaration_list RIGHT_BRACE 
	;

struct_declaration_list:
        struct_declaration 
        | struct_declaration_list struct_declaration 
	;

struct_declaration:
        type_specifier struct_declarator_list SEMICOLON
	;

struct_declarator_list:
        struct_declarator 
        | struct_declarator_list COMMA struct_declarator
	;
 
struct_declarator:
        IDENTIFIER 
        | IDENTIFIER LEFT_BRACKET constant_expression RIGHT_BRACKET
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
