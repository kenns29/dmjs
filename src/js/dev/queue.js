function queue() {
	var a = [],
	b = 0;

	var Q = {
		len : len,
		is_empty : is_empty,
		enqueue : enqueue,
		dequeue : dequeue,
		peek : peek
	};

	function len() {
		return a.length - b;
	}
	
	function is_empty() {
		return 0 == a.length;
	}
	
	function enqueue(b) {
		a.push(b);
	}
	
	function dequeue() {
		if (0 != a.length) {
			var c = a[b];
			2 * ++b >= a.length && (a = a.slice(b), b = 0);
			return c;
		}
	}
	function peek () {
		return 0 < a.length ? a[b] : void 0;
	}

	return Q;
}