var testrunner = require("qunit");
var sys = require('util')
var exec = require('child_process').exec;

function test_version(error, stdout, stderr) { 
    sys.puts(stdout); 
    testrunner.run({code:'/home/joseph/ws/clone/shomp/parser/glsl.js',
		    tests:'../parser/parser-tests.js'},
		   function(err,l) {
		       console.log(JSON.stringify(l))
		   }
		  );
}

var versions = [];
exec("cd /home/joseph/ws/clone/shomp; git log --no-decorate | grep commit | awk '{print $2}'", 
     function(error, stdout, stderr) {
	 sys.puts(stdout);
	 versions = stdout.split("\n");
	 exec("cd /home/joseph/ws/clone/shomp; rm -r *; git checkout " + versions[0] + " .", test_version);
     }
    );