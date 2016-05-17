var Calculator = (function (Stack) {

	var Calculator = function () {
		this.MAX_NUMBERS_LENGTH = 2;
		this.numbers = [];
		this.operator = null;
	};

	Calculator.prototype = new Stack();

	Calculator.prototype.add = function () {
		return (parseFloat(this.numbers[0]) + parseFloat(this.numbers[1]));
	};

	Calculator.prototype.subtract = function () {
		return (parseFloat(this.numbers[0]) - parseFloat(this.numbers[1]));
	};

	Calculator.prototype.multiply = function () {
		return (parseFloat(this.numbers[0]) * parseFloat(this.numbers[1]));
	};

	Calculator.prototype.divide = function () {
		if (parseFloat(this.numbers[1]) === 0) {
			return false;
		}

		return (parseFloat(this.numbers[0]) / parseFloat(this.numbers[1]));
	};

	Calculator.prototype.modulo = function () {
		if (parseFloat(this.numbers[1]) === 0) {
			return false;
		}

		return (parseFloat(this.numbers[0]) % parseFloat(this.numbers[1]));
	};

	Calculator.prototype.exponent = function () {
		if (parseFloat(this.numbers[1]) === 0) {
			return 1;
		}

		return(Math.pow(this.numbers[0], this.numbers[1]));
	};

	Calculator.prototype.display = function () {

	};

	Calculator.prototype.conversionFactor = function (factor) {
		console.log(factor);
	};

	Calculator.prototype.passNumber = function (number) {
		this.numbers.push(number)
	};

	Calculator.prototype.getNumberLength = function () {
		return this.numbers.length;
	};

	Calculator.prototype.clearNumbers = function () {
		this.numbers = [];
	};

	Calculator.prototype.passOperator = function (operator) {
		this.operator = operator;
	};

	Calculator.prototype.getOperator = function () {
		return this.operator;
	};

	Calculator.prototype.makeCalculation = function () {
		var answer = 0;
		if ((this.numbers.length <= this.MAX_NUMBERS_LENGTH) && this.operator) {
			switch(this.operator) {
				case '+': 
					answer = this.add();
					break;

				case '-':
					answer = this.subtract();
					break;

				case '*':
					answer = this.multiply();
					break;

				case '/':
					answer = this.divide();
					break;

				case '%':
					answer = this.modulo();
					break;

				case '^':
					answer = this.exponent();
					break;
			}
		}

		return answer;
	};

	return Calculator;

})(Stack);