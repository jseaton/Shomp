function floatHex(f) {
    return (Math.round(f[0].value*256)*65536+
	Math.round(f[1].value*256)*256+
	Math.round(f[2].value*256)).toString(16);
}

function generateUI(instance) {
    console.log(instance);
    var nodes = instance.shader.parseData.params;
    var structs = {};
    //var glow = instance.data;

    var ret = $('<div id="' + instance.name + '"/>');
    var deflt = {};
    for (var name in nodes) {
	var node = nodes[name];
	//console.log(node);
	//console.log(instance.glow.uniforms);
	if (node.qual != 'uniform' || instance.uniforms[name] || instance.children[name]) continue;
	
	//r.attr('class',name);
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
				instance.uniforms[name].set.apply(instance.glow.uniforms[name],ns);
				context.cache.clear();
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
			    instance.uniforms[name].value[$(this).attr('n')] = parseFloat(this.value);
			    instance.updateGLOW();
			    context.cache.clear();
			    render();
			});
		    }
		    var r = $('<div><h4>'+name+'</h4><span>'+node.type+'</span></div>')
		    r.append(nextCell);
		    ret.append(r);
		}	
	    } else if (node.type == 'sampler2D') {
		var n = name; //local
		deflt[name] = new GLOW.Texture({ url:'cube.JPG' });
		var r = $('<div><h4>'+name+'</h4><span>'+node.type+'</span></div>')
		r.append($('<input type="text" />').change(
		    function() {
			instance.uniforms[n] = new GLOW.Texture({ url:$(this).val() });
			instance.updateGLOW();
			//console.log(instance.glow.uniforms);
			context.cache.clear();
			render();
		    }
		));
		ret.append(r);
	    } else if (match=node.type.match(/mat([234])/)) {
		deflt[name] = match[2]==2 ? new GLOW.Matrix2() : (match[2]==3 ? new GLOW.Matrix3() : new GLOW.Matrix4());
		var r = $('<div><h4>'+name+'</h4><span>'+node.type+'</span></div>')
		r.append($('<input type="text" />').change(
		    function() {
			instance.uniforms[name] = eval($(this).val());
			instance.updateGLOW();
			context.cache.clear();
			render();
		    }
		).val(name == 'cameraProjection' ? 'GLOW.defaultCamera.projection' : (name == 'cameraInverse' ? 'GLOW.defaultCamera.inverse' : '')));
		ret.append(r);
	    } else if (node.type == 'float' || node.type == 'int') {
		deflt[name] = node.type == 'float' ? new GLOW.Float(0.0) : new GLOW.Int(0);
		var r = $('<div><h4>'+name+'</h4><span>'+node.type+'</span></div>')
		r.append($('<input type="text" />').change(
		    function() {
			instance.uniforms[name] = node.type == 'float' ? new GLOW.Float($(this).val()) : new GLOW.Int($(this).val());
			instance.updateGLOW();
			context.cache.clear();
			render();
		    }
		));
		ret.append(r);
	    } if (structs[node.type]) {
		var r = $('<div><h4>'+name+'</h4><span>'+node.type+'</span></div>')
		r.append(generateStructUI(structs[node.type],structs));
		ret.append(r);
	    }
	} else {
	    var r = $('<span>struct</span>');
	    r.append(generateStructUI(node.type,structs));
	    ret.append(r);
	}
    }
    return {deflt:deflt,html:r};
}