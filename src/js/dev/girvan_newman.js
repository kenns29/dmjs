function girvan_newman(){
	var graph;


	function execute(){
		var i, j;
		var tree, tree_node;
		var edge;
		var ebc;
		var clone_edges = graph.edges().slice(0);

		tree_node = {
			name : '',
			value : null,
			children : []
		};
		tree = tree_node;

		while(graph.edges().length > 0){
			ebc = edge_betweenness_centrality().graph(graph);
		
			ebc();


			var max = -Infinity;
			var max_edge_index = 0;


			graph.edges().forEach(function(edge, i){
				if(max < edge.edge_betweenness){
					max_edge_index = i;
					max = edge.edge_betweenness;
				}
			});
			edge = graph.edges()[max_edge_index];
			console.log('edge', edge.id);
			graph.remove_edge(edge);

			console.log('communities', communitiy_detection(graph));
		}
	}

	function communitiy_detection(graph){
		var i, node;
		var nodes = graph.nodes();
		var node_map = d3.map(nodes, function(d){
			return d.id;
		});

		var source;
		var communities = [];
		while(!node_map.empty()){
			source = node_map.values()[0];
			communities.push(community(source));
		}

		return communities;
		function community(source){
			var i;
			var node;
			var community_nodes = [];
			var neighbor;
			var neighbors;
			var visited_nodes = d3.set();

			var stack = new Array();
			stack.push(source);
			visited_nodes.add(source.id);
			node_map.remove(source.id);
			community_nodes.push(source);

			while(stack.length > 0){
				node = stack.pop();
				neighbors = node.all_neighbors();
				for(i = 0; i < neighbors.length; i++){
					neighbor = neighbors[i];
					if(!visited_nodes.has(neighbor.id)){
						visited_nodes.add(neighbor.id);
						node_map.remove(neighbor.id);
						community_nodes.push(neighbor);
						stack.push(neighbor);
					}
				}
			}			
			return community_nodes;
		}
	}




	function ret(){
		execute();
	}

	ret.graph = function(_){
		return arguments.length > 0 ? (graph = _, ret) : graph;
	};

	return ret;
}