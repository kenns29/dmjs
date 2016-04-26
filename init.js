$(document).ready(function(){
	draw_hierachical_with_binary_data();
	// draw_hierachical_with_continous_data();
	draw_kmean_with_euclidean();
});
/*
* Euclidean distance example
*/
function draw_hierachical_with_continous_data(){
	var cluster = new HierachicalCluster()
	.data([{
		name : '1',
		value : {
			point : [0.4, 0.53]
		}
	},
	{
		name : '2',
		value: {
			point : [0.22, 0.38]
		}
	},
	{
		name : '3',
		value: {
			point : [0.35, 0.32]
		}
	},
	{
		name : '4', 
		value : {
			point : [0.26, 0.19]
		}
	},
	{
		name : '5',
		value : {
			point : [0.08, 0.41]
		}
	},
	{
		name : '6',
		value : {
			point : [0.45, 0.30]
		}
	}])
	.dist_metric(tanimoto_distance)
	.dist_fun('centroid')
	.save_history(true)
	.init()
	.cluster();
	
	new DrawTree().container('tree-container').data(cluster.root()).draw();
	
	var matrix = cluster.pair2matrix(cluster.leafPairs());
	new DrawMatrix().data(matrix).container('matrix-container').draw();
	new DrawMatrixHistory().container('matrix-history-container').cluster(cluster).draw();
}

/*
* Jaccard distance example
*/
function draw_hierachical_with_binary_data(){
		var cluster = new HierachicalCluster()
	.data([{
		name : '1',
		value : {
			point : [1, 0, 0, 1, 0, 0]
		}
	},
	{
		name : '2',
		value: {
			point : [0, 1, 0, 1, 0, 0]
		}
	},
	{
		name : '3',
		value: {
			point : [0, 0, 0, 1, 0, 1]
		}
	},
	{
		name : '4', 
		value : {
			point : [0, 1, 0, 1, 0, 0]
		}
	},
	{
		name : '5',
		value : {
			point : [0, 0, 0, 1, 0, 0]
		}
	},
	{
		name : '6',
		value : {
			point : [0, 0, 0, 1, 0, 0]
		}
	}])
	.dist_metric(function(a, b){
		var m01 = 0, m10 = 0, m00 = 0, m11 = 0;
		for(var i = 0; i < a.length; i++){
			if(a[i] == b[i] == 1) ++m11;
			else if(a[i] == 1 && b[i] == 0) ++m10;
			else if(a[i] == 0 && b[i] == 1) ++m01;
			else if(a[i] == 0 && b[i] == 0) ++m00;
		}
		var sim = (m01 + m10 + m11 > 0) ? m11 / (m01 + m10 + m11) : 1;
		return 1 - sim;
	})
	.save_history(true)
	.dist_metric(jaccard_distance)
	.dist_fun('group_average')
	.init()
	.cluster();
	
	new DrawTree().container('tree-container').data(cluster.root()).draw();
	
	var matrix = cluster.pair2matrix(cluster.leafPairs());
	new DrawMatrix().data(matrix).container('matrix-container').draw();
	new DrawMatrixHistory().container('matrix-history-container').cluster(cluster).draw();
}

function draw_kmean_with_euclidean(){
	var cluster = new KMean()
	.data([{
		name : '1',
		value : {
			point : [1, 1]
		}
	},
	{
		name : '2',
		value: {
			point : [1.5, 2.0]
		}
	},
	{
		name : '3',
		value: {
			point : [3, 4]
		}
	},
	{
		name : '4', 
		value : {
			point : [5, 7]
		}
	},
	{
		name : '5',
		value : {
			point : [3.5, 5]
		}
	},
	{
		name : '6',
		value : {
			point : [4.5, 5]
		}
	},
	{
		name : '7',
		value : {
			point : [3.5, 4.5]
		} 
	}
	])
	.clusters([
		{
			'name' : 'C1',
			'value' : {
				'centroid' : [1, 1]
			}
		},
		{
			'name' : 'C2',
			'value' : {
				'centroid' : [5, 7]
			}
		}
	])
	.evaluate_sse(true)
	.save_history(true)
	.stopThreshold(0)
	.dist_metric(euclidean_distance)
	.cluster();

	var clusters = cluster.clusters();
	var history = cluster.history();
	
	kmean_output_display(cluster);
}