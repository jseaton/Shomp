function fboReduce(tree) {
    var nodes = {};
    function reduce(node) {
	if (!node.__shader__) continue;
	node.edges ||= {};
	
	for (i in tree.data) reduce(tree.data[i]);
    }
	