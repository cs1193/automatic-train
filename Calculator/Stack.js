var Stack = (function () {

	var Stack = function () {
		this.items = new Array();
	};

	Stack.prototype.push = function (item) {
		this.items.push(item);
	};

	Stack.prototype.pop = function () {
		return this.items.pop();
	};

	Stack.prototype.top = function () {
		return this.items[this.items.length - 1];
	};

	Stack.prototype.isEmpty = function () {
		return this.items.length === 0;
	};

	Stack.prototype.size = function () {
		return this.items.length;
	};

	Stack.prototype.delete = function () {
		this.items = [];
	};

	Stack.prototype.print = function () {
		if (this.items.length > 0) {
			for(var i = 0; i < this.items.length; i++) {
				console.log(this.items[i]);
			}
		}
	};

	return Stack;

})();