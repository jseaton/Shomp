function generateUI(node,structs,callback,name) {
    //Interesting note: naming this ret as in generateStructUI will cause this all to fall over
    //presumably due to some bug in JQuery
    r = $('<span>'+node.type+'</span>');
    if (typeof node.type == 'string') {
	if (match=node.type.match(/([bi]?)vec([234])/)) {
	    for (i=0;i<match[2];i++) {
		callback[name][i] = 0;
		closed_i=i.toString();
		r.append($('<input type="text" />').attr('n',i).change(
		    function() {
			callback[name][$(this).attr('n')] = parseInt($(this).val());
		    }
		));
	    }
	} else if (node.type == 'sampler2D') {
	    r.append($('<input type="text" />').change(
		function() {
		    callback[name] = new GLOW.Texture({ url:$(this).val() });
		}
	    ));
	} else if (match=node.type.match(/mat([234])/)) {
	    r.append($('<input type="text" />').change(
		function() {
		    callback[name] = eval($(this).val());
		}
	    ));
	} else if (structs[node.type]) {
	    r.append(generateStructUI(structs[node.type],structs,callback[name]));
	}
    } else {
	r = $('<span>struct</span>');
	r.append(generateStructUI(node.type,structs));
    }
    return r;
}

function generateStructUI(nodes,structs,callback) {
    ret = $('<div/>');
    for (i in nodes) {
	if (nodes[i].qual != 'uniform') continue;
	sub = $('<div><h4>'+i+'</h4></div>').attr('class',i);
	callback[i] = {};
	sub.append(generateUI(nodes[i],structs,callback,i));
	ret.append(sub);
    }
    return ret;
}