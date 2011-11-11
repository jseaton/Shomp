/*
	Default driver template for JS/CC generated parsers for Mozilla/Rhino
	
	WARNING: Do not use for parsers that should run as browser-based JavaScript!
			 Use driver_web.js_ instead!
	
	Features:
	- Parser trace messages
	- Step-by-step parsing
	- Integrated panic-mode error recovery
	- Pseudo-graphical parse tree generation
	
	Written 2007 by Jan Max Meyer, J.M.K S.F. Software Technologies
        Modified 2007 from driver.js_ to support Mozilla/Rhino
           by Louis P.Santillan <lpsantil@gmail.com>
	
	This is in the public domain.
*/


var _dbg_withparsetree	= false;
var _dbg_withtrace		= false;
var _dbg_withstepbystep	= false;

function __dbg_print( text )
{
	print( text );
}

function __dbg_wait()
{
   var kbd = new java.io.BufferedReader(
                new java.io.InputStreamReader( java.lang.System[ "in" ] ) );

   kbd.readLine();
}

function __lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 38;

		do
		{

switch( state )
{
	case 0:
		if( info.src.charCodeAt( pos ) == 9 || info.src.charCodeAt( pos ) == 32 ) state = 1;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 2;
		else if( info.src.charCodeAt( pos ) == 97 ) state = 37;
		else if( info.src.charCodeAt( pos ) == 98 ) state = 38;
		else if( info.src.charCodeAt( pos ) == 99 ) state = 39;
		else if( info.src.charCodeAt( pos ) == 100 ) state = 40;
		else if( info.src.charCodeAt( pos ) == 101 ) state = 41;
		else if( info.src.charCodeAt( pos ) == 102 ) state = 42;
		else if( info.src.charCodeAt( pos ) == 105 ) state = 43;
		else if( info.src.charCodeAt( pos ) == 109 ) state = 44;
		else if( info.src.charCodeAt( pos ) == 111 ) state = 45;
		else if( info.src.charCodeAt( pos ) == 114 ) state = 46;
		else if( info.src.charCodeAt( pos ) == 115 ) state = 47;
		else if( info.src.charCodeAt( pos ) == 116 ) state = 48;
		else if( info.src.charCodeAt( pos ) == 117 ) state = 49;
		else if( info.src.charCodeAt( pos ) == 118 ) state = 50;
		else if( info.src.charCodeAt( pos ) == 119 ) state = 51;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 2;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 52;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 12;
		match_pos = pos;
		break;

	case 5:
		if( info.src.charCodeAt( pos ) == 111 ) state = 108;
		else state = -1;
		match = 27;
		match_pos = pos;
		break;

	case 6:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
		else state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 7:
		state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 8:
		state = -1;
		match = 28;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 10:
		state = -1;
		match = 24;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 25;
		match_pos = pos;
		break;

	case 12:
		state = -1;
		match = 26;
		match_pos = pos;
		break;

	case 13:
		state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 14:
		state = -1;
		match = 21;
		match_pos = pos;
		break;

	case 15:
		state = -1;
		match = 22;
		match_pos = pos;
		break;

	case 16:
		state = -1;
		match = 23;
		match_pos = pos;
		break;

	case 17:
		state = -1;
		match = 35;
		match_pos = pos;
		break;

	case 18:
		state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 19:
		state = -1;
		match = 15;
		match_pos = pos;
		break;

	case 20:
		state = -1;
		match = 16;
		match_pos = pos;
		break;

	case 21:
		state = -1;
		match = 17;
		match_pos = pos;
		break;

	case 22:
		state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 23:
		state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 24:
		state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 25:
		state = -1;
		match = 19;
		match_pos = pos;
		break;

	case 26:
		state = -1;
		match = 20;
		match_pos = pos;
		break;

	case 27:
		state = -1;
		match = 36;
		match_pos = pos;
		break;

	case 28:
		state = -1;
		match = 14;
		match_pos = pos;
		break;

	case 29:
		state = -1;
		match = 34;
		match_pos = pos;
		break;

	case 30:
		state = -1;
		match = 13;
		match_pos = pos;
		break;

	case 31:
		state = -1;
		match = 30;
		match_pos = pos;
		break;

	case 32:
		state = -1;
		match = 31;
		match_pos = pos;
		break;

	case 33:
		state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 34:
		state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 35:
		state = -1;
		match = 32;
		match_pos = pos;
		break;

	case 36:
		state = -1;
		match = 33;
		match_pos = pos;
		break;

	case 37:
		if( info.src.charCodeAt( pos ) == 116 ) state = 104;
		else state = -1;
		break;

	case 38:
		if( info.src.charCodeAt( pos ) == 114 ) state = 53;
		else if( info.src.charCodeAt( pos ) == 118 ) state = 106;
		else state = -1;
		break;

	case 39:
		if( info.src.charCodeAt( pos ) == 111 ) state = 105;
		else state = -1;
		break;

	case 40:
		if( info.src.charCodeAt( pos ) == 111 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 105 ) state = 54;
		else state = -1;
		break;

	case 41:
		if( info.src.charCodeAt( pos ) == 108 ) state = 107;
		else state = -1;
		break;

	case 42:
		if( info.src.charCodeAt( pos ) == 97 ) state = 55;
		else if( info.src.charCodeAt( pos ) == 111 ) state = 56;
		else state = -1;
		break;

	case 43:
		if( info.src.charCodeAt( pos ) == 102 ) state = 4;
		else if( info.src.charCodeAt( pos ) == 110 ) state = 5;
		else if( info.src.charCodeAt( pos ) == 118 ) state = 127;
		else state = -1;
		break;

	case 44:
		if( info.src.charCodeAt( pos ) == 97 ) state = 117;
		else state = -1;
		break;

	case 45:
		if( info.src.charCodeAt( pos ) == 117 ) state = 57;
		else state = -1;
		break;

	case 46:
		if( info.src.charCodeAt( pos ) == 101 ) state = 122;
		else state = -1;
		break;

	case 47:
		if( info.src.charCodeAt( pos ) == 97 ) state = 58;
		else if( info.src.charCodeAt( pos ) == 116 ) state = 126;
		else state = -1;
		break;

	case 48:
		if( info.src.charCodeAt( pos ) == 114 ) state = 59;
		else state = -1;
		break;

	case 49:
		if( info.src.charCodeAt( pos ) == 110 ) state = 60;
		else state = -1;
		break;

	case 50:
		if( info.src.charCodeAt( pos ) == 97 ) state = 61;
		else if( info.src.charCodeAt( pos ) == 101 ) state = 62;
		else if( info.src.charCodeAt( pos ) == 111 ) state = 109;
		else state = -1;
		break;

	case 51:
		if( info.src.charCodeAt( pos ) == 104 ) state = 119;
		else state = -1;
		break;

	case 52:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
		else state = -1;
		break;

	case 53:
		if( info.src.charCodeAt( pos ) == 101 ) state = 63;
		else state = -1;
		break;

	case 54:
		if( info.src.charCodeAt( pos ) == 115 ) state = 120;
		else state = -1;
		break;

	case 55:
		if( info.src.charCodeAt( pos ) == 108 ) state = 66;
		else state = -1;
		break;

	case 56:
		if( info.src.charCodeAt( pos ) == 114 ) state = 7;
		else state = -1;
		break;

	case 57:
		if( info.src.charCodeAt( pos ) == 116 ) state = 8;
		else state = -1;
		break;

	case 58:
		if( info.src.charCodeAt( pos ) == 109 ) state = 68;
		else state = -1;
		break;

	case 59:
		if( info.src.charCodeAt( pos ) == 117 ) state = 69;
		else state = -1;
		break;

	case 60:
		if( info.src.charCodeAt( pos ) == 105 ) state = 70;
		else state = -1;
		break;

	case 61:
		if( info.src.charCodeAt( pos ) == 114 ) state = 71;
		else state = -1;
		break;

	case 62:
		if( info.src.charCodeAt( pos ) == 99 ) state = 72;
		else state = -1;
		break;

	case 63:
		if( info.src.charCodeAt( pos ) == 97 ) state = 76;
		else state = -1;
		break;

	case 64:
		if( info.src.charCodeAt( pos ) == 115 ) state = 78;
		else if( info.src.charCodeAt( pos ) == 116 ) state = 113;
		else state = -1;
		break;

	case 65:
		if( info.src.charCodeAt( pos ) == 101 ) state = 9;
		else state = -1;
		break;

	case 66:
		if( info.src.charCodeAt( pos ) == 115 ) state = 69;
		else state = -1;
		break;

	case 67:
		if( info.src.charCodeAt( pos ) == 50 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 51 ) state = 11;
		else if( info.src.charCodeAt( pos ) == 52 ) state = 12;
		else state = -1;
		break;

	case 68:
		if( info.src.charCodeAt( pos ) == 112 ) state = 112;
		else state = -1;
		break;

	case 69:
		if( info.src.charCodeAt( pos ) == 101 ) state = 13;
		else state = -1;
		break;

	case 70:
		if( info.src.charCodeAt( pos ) == 102 ) state = 84;
		else state = -1;
		break;

	case 71:
		if( info.src.charCodeAt( pos ) == 121 ) state = 121;
		else state = -1;
		break;

	case 72:
		if( info.src.charCodeAt( pos ) == 50 ) state = 14;
		else if( info.src.charCodeAt( pos ) == 51 ) state = 15;
		else if( info.src.charCodeAt( pos ) == 52 ) state = 16;
		else state = -1;
		break;

	case 73:
		if( info.src.charCodeAt( pos ) == 100 ) state = 17;
		else state = -1;
		break;

	case 74:
		if( info.src.charCodeAt( pos ) == 108 ) state = 85;
		else state = -1;
		break;

	case 75:
		if( info.src.charCodeAt( pos ) == 105 ) state = 86;
		else state = -1;
		break;

	case 76:
		if( info.src.charCodeAt( pos ) == 107 ) state = 18;
		else state = -1;
		break;

	case 77:
		if( info.src.charCodeAt( pos ) == 50 ) state = 19;
		else if( info.src.charCodeAt( pos ) == 51 ) state = 20;
		else if( info.src.charCodeAt( pos ) == 52 ) state = 21;
		else state = -1;
		break;

	case 78:
		if( info.src.charCodeAt( pos ) == 116 ) state = 22;
		else state = -1;
		break;

	case 79:
		if( info.src.charCodeAt( pos ) == 97 ) state = 114;
		else state = -1;
		break;

	case 80:
		if( info.src.charCodeAt( pos ) == 116 ) state = 23;
		else state = -1;
		break;

	case 81:
		if( info.src.charCodeAt( pos ) == 50 ) state = 24;
		else if( info.src.charCodeAt( pos ) == 51 ) state = 25;
		else if( info.src.charCodeAt( pos ) == 52 ) state = 26;
		else state = -1;
		break;

	case 82:
		if( info.src.charCodeAt( pos ) == 114 ) state = 88;
		else state = -1;
		break;

	case 83:
		if( info.src.charCodeAt( pos ) == 99 ) state = 90;
		else state = -1;
		break;

	case 84:
		if( info.src.charCodeAt( pos ) == 111 ) state = 91;
		else state = -1;
		break;

	case 85:
		if( info.src.charCodeAt( pos ) == 101 ) state = 27;
		else state = -1;
		break;

	case 86:
		if( info.src.charCodeAt( pos ) == 98 ) state = 92;
		else state = -1;
		break;

	case 87:
		if( info.src.charCodeAt( pos ) == 110 ) state = 93;
		else state = -1;
		break;

	case 88:
		if( info.src.charCodeAt( pos ) == 110 ) state = 28;
		else state = -1;
		break;

	case 89:
		if( info.src.charCodeAt( pos ) == 101 ) state = 116;
		else state = -1;
		break;

	case 90:
		if( info.src.charCodeAt( pos ) == 116 ) state = 29;
		else state = -1;
		break;

	case 91:
		if( info.src.charCodeAt( pos ) == 114 ) state = 95;
		else state = -1;
		break;

	case 92:
		if( info.src.charCodeAt( pos ) == 117 ) state = 125;
		else state = -1;
		break;

	case 93:
		if( info.src.charCodeAt( pos ) == 117 ) state = 97;
		else state = -1;
		break;

	case 94:
		if( info.src.charCodeAt( pos ) == 100 ) state = 30;
		else state = -1;
		break;

	case 95:
		if( info.src.charCodeAt( pos ) == 109 ) state = 31;
		else state = -1;
		break;

	case 96:
		if( info.src.charCodeAt( pos ) == 103 ) state = 32;
		else state = -1;
		break;

	case 97:
		if( info.src.charCodeAt( pos ) == 101 ) state = 33;
		else state = -1;
		break;

	case 98:
		if( info.src.charCodeAt( pos ) == 50 ) state = 100;
		else if( info.src.charCodeAt( pos ) == 99 ) state = 101;
		else state = -1;
		break;

	case 99:
		if( info.src.charCodeAt( pos ) == 101 ) state = 34;
		else state = -1;
		break;

	case 100:
		if( info.src.charCodeAt( pos ) == 100 ) state = 35;
		else state = -1;
		break;

	case 101:
		if( info.src.charCodeAt( pos ) == 117 ) state = 102;
		else state = -1;
		break;

	case 102:
		if( info.src.charCodeAt( pos ) == 98 ) state = 103;
		else state = -1;
		break;

	case 103:
		if( info.src.charCodeAt( pos ) == 101 ) state = 36;
		else state = -1;
		break;

	case 104:
		if( info.src.charCodeAt( pos ) == 116 ) state = 110;
		else state = -1;
		break;

	case 105:
		if( info.src.charCodeAt( pos ) == 110 ) state = 64;
		else state = -1;
		break;

	case 106:
		if( info.src.charCodeAt( pos ) == 101 ) state = 111;
		else state = -1;
		break;

	case 107:
		if( info.src.charCodeAt( pos ) == 115 ) state = 65;
		else state = -1;
		break;

	case 108:
		if( info.src.charCodeAt( pos ) == 117 ) state = 80;
		else state = -1;
		break;

	case 109:
		if( info.src.charCodeAt( pos ) == 105 ) state = 73;
		else state = -1;
		break;

	case 110:
		if( info.src.charCodeAt( pos ) == 114 ) state = 75;
		else state = -1;
		break;

	case 111:
		if( info.src.charCodeAt( pos ) == 99 ) state = 77;
		else state = -1;
		break;

	case 112:
		if( info.src.charCodeAt( pos ) == 108 ) state = 89;
		else state = -1;
		break;

	case 113:
		if( info.src.charCodeAt( pos ) == 105 ) state = 87;
		else state = -1;
		break;

	case 114:
		if( info.src.charCodeAt( pos ) == 114 ) state = 94;
		else state = -1;
		break;

	case 115:
		if( info.src.charCodeAt( pos ) == 110 ) state = 96;
		else state = -1;
		break;

	case 116:
		if( info.src.charCodeAt( pos ) == 114 ) state = 98;
		else state = -1;
		break;

	case 117:
		if( info.src.charCodeAt( pos ) == 116 ) state = 67;
		else state = -1;
		break;

	case 118:
		if( info.src.charCodeAt( pos ) == 117 ) state = 82;
		else state = -1;
		break;

	case 119:
		if( info.src.charCodeAt( pos ) == 105 ) state = 74;
		else state = -1;
		break;

	case 120:
		if( info.src.charCodeAt( pos ) == 99 ) state = 79;
		else state = -1;
		break;

	case 121:
		if( info.src.charCodeAt( pos ) == 105 ) state = 115;
		else state = -1;
		break;

	case 122:
		if( info.src.charCodeAt( pos ) == 116 ) state = 118;
		else state = -1;
		break;

	case 123:
		if( info.src.charCodeAt( pos ) == 117 ) state = 83;
		else state = -1;
		break;

	case 124:
		if( info.src.charCodeAt( pos ) == 99 ) state = 81;
		else state = -1;
		break;

	case 125:
		if( info.src.charCodeAt( pos ) == 116 ) state = 99;
		else state = -1;
		break;

	case 126:
		if( info.src.charCodeAt( pos ) == 114 ) state = 123;
		else state = -1;
		break;

	case 127:
		if( info.src.charCodeAt( pos ) == 101 ) state = 124;
		else state = -1;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		
switch( match )
{
	case 5:
		{
		 info.att = parseFloat(info.att); 
		}
		break;

	case 6:
		{
		 info.att = parseInt(info.att); 
		}
		break;

}


	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __parse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
	//Visual parse tree generation
	var 	treenode		= new Function( "", "var sym; var att; var child;" );
	var		treenodes		= new Array();
	var		tree			= new Array();
	var		tmptree			= null;

/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* e' */, 1 ),
	new Array( 37/* e */, 1 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 5/* "FLOAT" */,2 ),
	/* State 1 */ new Array( 38/* "$" */,0 ),
	/* State 2 */ new Array( 38/* "$" */,-1 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 37/* e */,1 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"e'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"ATTRIBUTE" /* Terminal symbol */,
	"CONST" /* Terminal symbol */,
	"BOOL" /* Terminal symbol */,
	"FLOAT" /* Terminal symbol */,
	"INT" /* Terminal symbol */,
	"BREAK" /* Terminal symbol */,
	"CONTINUE" /* Terminal symbol */,
	"DO" /* Terminal symbol */,
	"ELSE" /* Terminal symbol */,
	"FOR" /* Terminal symbol */,
	"IF" /* Terminal symbol */,
	"DISCARD" /* Terminal symbol */,
	"RETURN" /* Terminal symbol */,
	"BVEC2" /* Terminal symbol */,
	"BVEC3" /* Terminal symbol */,
	"BVEC4" /* Terminal symbol */,
	"IVEC2" /* Terminal symbol */,
	"IVEC3" /* Terminal symbol */,
	"IVEC4" /* Terminal symbol */,
	"VEC2" /* Terminal symbol */,
	"VEC3" /* Terminal symbol */,
	"VEC4" /* Terminal symbol */,
	"MAT2" /* Terminal symbol */,
	"MAT3" /* Terminal symbol */,
	"MAT4" /* Terminal symbol */,
	"IN" /* Terminal symbol */,
	"OUT" /* Terminal symbol */,
	"INOUT" /* Terminal symbol */,
	"UNIFORM" /* Terminal symbol */,
	"VARYING" /* Terminal symbol */,
	"SAMPLER2D" /* Terminal symbol */,
	"SAMPLERCUBE" /* Terminal symbol */,
	"STRUCT" /* Terminal symbol */,
	"VOID" /* Terminal symbol */,
	"WHILE" /* Terminal symbol */,
	"e" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __lex( info );
			
	while( true )
	{
		act = 4;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		/*
		_print( "state " + sstack[sstack.length-1] + " la = " + la + " info.att = >" +
				info.att + "< act = " + act + " src = >" + info.src.substr( info.offset, 30 ) + "..." + "<" +
					" sstack = " + sstack.join() );
		*/
		
		if( _dbg_withtrace && sstack.length > 0 )
		{
			__dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
			
			if( _dbg_withstepbystep )
				__dbg_wait();
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 4 )
		{
			if( _dbg_withtrace )
				__dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 4 && la != 38 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 4 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 4;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 4 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __lex( info );
			}
			
			if( act == 4 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( _dbg_withtrace )
				__dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 4 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{
			//Parse tree generation
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ la ];
				node.att = info.att;
				node.child = new Array();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( _dbg_withtrace )
				__dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __lex( info );
			
			if( _dbg_withtrace )
				__dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( _dbg_withtrace )
				__dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( _dbg_withtrace )
				__dbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		 print(vstack[ vstack.length - 1 ]) 
	}
	break;
}


			
			if( _dbg_withparsetree )
				tmptree = new Array();

			if( _dbg_withtrace )
				__dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				if( _dbg_withparsetree )
					tmptree.push( tree.pop() );
					
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ pop_tab[act][0] ];
				node.att = new String();
				node.child = tmptree.reverse();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( act == 0 )
				break;
				
			if( _dbg_withtrace )
				__dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
	}

	if( _dbg_withtrace )
		__dbg_print( "\nParse complete." );

	if( _dbg_withparsetree )
	{
		if( err_cnt == 0 )
		{
			__dbg_print( "\n\n--- Parse tree ---" );
			__dbg_parsetree( 0, treenodes, tree );
		}
		else
		{
			__dbg_print( "\n\nParse tree cannot be viewed. There where parse errors." );
		}
	}
	
	return err_cnt;
}


function __dbg_parsetree( indent, nodes, tree )
{
	var str = new String();
	for( var i = 0; i < tree.length; i++ )
	{
		str = "";
		for( var j = indent; j > 0; j-- )
			str += "\t";
		
		str += nodes[ tree[i] ].sym;
		if( nodes[ tree[i] ].att != "" )
			str += " >" + nodes[ tree[i] ].att + "<" ;
			
		__dbg_print( str );
		if( nodes[ tree[i] ].child.length > 0 )
			__dbg_parsetree( indent + 1, nodes, nodes[ tree[i] ].child );
	}
}



