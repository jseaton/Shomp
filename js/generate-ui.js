function floatHex(f) {
    return (Math.round(f[0].value*256)*65536+
	Math.round(f[1].value*256)*256+
	Math.round(f[2].value*256)).toString(16);
}

function generateUI(nodes,structs,glow) {
    var ret = $('<div/>');
    var deflt = {};
    
    for (name in nodes) {
	node = nodes[name];
	if (node.qual != 'uniform' || glow[i]) continue;
	var r = $('<div><h4>'+i+'</h4><span>'+node.type+'</span></div>')
	r.attr('class',i);
	if (typeof node.type == 'string') {
	    if (match=node.type.match(/([bi]?)vec([234])/)) {
		deflt[name] = match[2]==2 ? new GLOW.Vector2() : (match[2]==3 ? new GLOW.Vector3() : new GLOW.Vector4());
		for (var i=0;i<match[2];i++) {
		    var nextCell = $('<input type="text" />').attr('n',i);
		    if (match[2] > 2) {
			nextCell.ColorPicker({
			    onChange: function(hsb, hex, rgb, el) {
				var rs = r.find('input');
				var ns = [rgb.r/256,rgb.g/256,rgb.b/256];
				rs[0].value = ns[0];
				rs[1].value = ns[1];
				rs[2].value = ns[2];
				rs.css('backgroundColor', '#' + hex);
				if (rs[3]) ns[3] = parseFloat(rs[3].value);
				glow[name].set.apply(glow[name],ns);
				render();
			    },
			    onBeforeShow: function () {
				var rs = r.find('input');
				rs.ColorPickerSetColor(floatHex(rs));
			    }
			}).bind('keyup',function(){
			    var rs = r.find('input');
			    var hex = floatHex(rs);
			    console.log(hex);
			    rs.ColorPickerSetColor(hex);
			    rs.css('backgroundColor', '#' + hex);
			    glow[name].value[$(this).attr('n')] = parseFloat(this.value);
			    render();
			});
		    }
		    r.append(nextCell);
		}	
	    } else if (node.type == 'sampler2D') {
		deflt[name] = new GLOW.Texture({ url:'cube.JPG' });
		r.append($('<input type="text" />').change(
		    function() {
			glow[name] = new GLOW.Texture({ url:$(this).val() });
			render();
		    }
		));
	    } else if (match=node.type.match(/mat([234])/)) {
		deflt[name] = match[2]==2 ? new GLOW.Matrix2() : (match[2]==3 ? new GLOW.Matrix3() : new GLOW.Matrix4());
		r.append($('<input type="text" />').change(
		    function() {
			callback[name] = eval($(this).val());
			render();
		    }
		).val(name == 'cameraProjection' ? 'GLOW.defaultCamera.projection' : (name == 'cameraInverse' ? 'GLOW.defaultCamera.inverse' : '')));
	    } else if (structs[node.type]) {
		r.append(generateStructUI(structs[node.type],structs));
	    }
	} else {
	    r = $('<span>struct</span>');
	    r.append(generateStructUI(node.type,structs));
	}
	ret.append(r);
    }
    return {deflt:deflt,html:r};
}