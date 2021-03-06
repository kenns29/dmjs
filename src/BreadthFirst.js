import queue from './Queue.js';
export default function(){
	var graph;
	var source;
	var direction = 'undirected';

	function visit(d){
		// console.log(d, d.id, d.bs_status.tree_node.weight, d.bs_status.visited, d.bs_status.level, d.all_neighbors().map(function(d){return d.id;}));
	}

	function init_nodes(nodes){
		nodes.forEach(function(d){
			d.bs_status = {
				visited : false,
				level : 0,
				tree_node : null
			};
		});
	}

	function search(){
		//the minimum spaning tree that are returned
		var tree;
		var tree_node;
		var node;
		var Q = queue();
		var nodes = graph.nodes();
		init_nodes(nodes);

		tree_node = {
			level : 0,
			in_flow : [],
			out_flow : [],
			weight : 1,
			parent : null,
			children : [],
			value : source
		};
		tree = tree_node;

		source.bs_status.tree_node = tree_node;
		source.bs_status.visited = true;
		Q.enqueue(source);
		while(!Q.empty()){
			node = Q.dequeue();
			node.all_neighbors().forEach(function(neighbor){
				if(!neighbor.bs_status.visited){

					tree_node = {
						level : node.bs_status.level + 1,
						in_flow : [],
						out_flow : [],
						weight : 0,
						parent : node.bs_status.tree_node,
						children : [],
						value : neighbor
					};

					neighbor.bs_status.visited = true;
					neighbor.bs_status.level = node.bs_status.level + 1;
					neighbor.bs_status.tree_node = tree_node;

					node.bs_status.tree_node.children.push(tree_node);

					Q.enqueue(neighbor);
				}
				if(node.bs_status.level + 1 === neighbor.bs_status.level){
					neighbor.bs_status.tree_node.weight += node.bs_status.tree_node.weight;
					neighbor.bs_status.tree_node.in_flow.push(node.bs_status.tree_node);
					node.bs_status.tree_node.out_flow.push(neighbor.bs_status.tree_node);
				}
			});
			visit(node);
		}
		clean_up();
		return tree;
	}

	function clean_up(){
		graph.nodes().forEach(function(d){
			delete d.bs_status;
		});
	}

	function ret(){
		return search();
	}
	ret.graph = function(_){
		return arguments.length > 0 ? (graph = _, ret) : graph;
	};
	ret.direction = function(_){
		return arguments.length > 0 ? (direction = _, ret) : direction;
	};
	ret.visit = function(_){
		if(arguments.length > 0) visit = _;
		return ret;
	};
	ret.source = function(_){
		return arguments.length > 0 ? (source = _, ret) : source;
	};

	return ret;
};