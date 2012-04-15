var testrunner = require("qunit");
var sys = require('util')
var exec = require('child_process').exec;
var fs = require('fs');
var versions = [];
var results = [];
var cur = {"files":0,"assertions":0,"failed":0,"passed":0,"runtime":0,"tests":0};

function run() {
     if (results.length < versions.length-8) {
	 try { 
	     exec("cd /home/joseph/ws/clone/shomp; rm -r *; git checkout " + versions[results.length] + " .", test_version);
	 } catch (e) {
	     console.log("ERROR");
	     console.log(e);
	     results.push(0);
	     run();
    }   
    } else {
	console.log("FINIT");
	console.log(JSON.stringify(results));
	var fd = fs.openSync("../diss/parser.data","w");
	results = results.reverse();
	for (i in results)
	    fs.writeSync(fd,i + "\t" + results[i].passed + "\n");
	fs.close(fd);
    }
}

function test_version(error, stdout, stderr) { 
    //sys.puts(stdout); 
    try {
	testrunner.run({code:'/home/joseph/ws/clone/shomp/parser/glsl.js',
			tests:'../parser/parser-tests.js'},
		       function(err,l) {
			   r = {}
			   for (i in l) r[i] = l[i] - cur[i];
			   cur = l;
			   results.push(r);
			   console.log(JSON.stringify(r));
			   console.log("COMPLETED " + results.length);
			   run();
		       }
		      );
    } catch (e) {
	console.log("ERROR");
	console.log(e);
	results.push(results[0]);
	run();
    }
   
}
exec("cd /home/joseph/ws/clone/shomp; git log --no-decorate | grep commit | awk '{print $2}'", 
     function(error, stdout, stderr) {
	 sys.puts(stdout);
	 versions = stdout.split("\n");
	 exec("cd /home/joseph/ws/clone/shomp; rm -r *; git checkout " + versions[0] + " .", test_version);
     }
    );