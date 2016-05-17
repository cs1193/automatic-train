(function (Calculator) {

	document.addEventListener("DOMContentLoaded", function () {
		var calculator = new Calculator();

		var calculatorButton = document.querySelectorAll('.calculatorButton');
		var calculatorTextInput = document.querySelector('.calculatorTextInput');
		var calculatorHistoryInput = document.querySelector('.calculatorHistory');

		var MAXIMUM_TEXT_INPUT_LENGTH = 10;
		var MAXIMUM_HISTORY_HOLD_LENGTH = 2;

		for (var index = 0; index < calculatorButton.length; index++) {
			calculatorButton[index].addEventListener('click', IssueOperative, true);
		}

		function IssueOperative () {
			var string = this.getAttribute('data-operative');
			FeederInput(string);
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			// if (calculator.validate(string)) {

			// 	if (string === "C") {
			// 		ClearInputData();
			// 	} else if (string === "+" || string === "-" || string === "*" || string === "/" || string === "%" || string === "^") {
					

			// 		if (calculator.getNumberLength() < MAXIMUM_HISTORY_HOLD_LENGTH) {
			// 			calculator.passNumber(currentText);
			// 		} 

			// 		if (calculator.getNumberLength() === 1) {
			// 			calculator.passOperator(string);
			// 		}

			// 		console.log(calculator.numbers);
			// 		calculatorTextInput.innerHTML = "";
			// 		var node = document.createTextNode(currentText + " " + string + " ");
			// 		calculatorHistoryInput.appendChild(node);	
			// 	} else if (string === "=") {
			// 		console.log(calculator.makeCalculation());
			// 	} else {
			// 		if (currentTextLength < MAXIMUM_TEXT_INPUT_LENGTH) {
			// 			var node = document.createTextNode(string);
			// 			calculatorTextInput.appendChild(node);
			// 		}
			// 	}
			// }
		}

		// document.addEventListener('keydown', TakeInput, false);

		// function TakeInput (event) {
		// 	event.stopPropagation();

		// 	var keycode = event.keyCode;
		// 	calculator.conversionFactor(keycode);
		// 	var shift = event.shiftKey;
		// 	var string;

		// 	switch (keycode) {
		// 		case 8:
		// 			break;

		// 		case 46:
		// 			break;

		// 		case 53: 
		// 			if (shift) string = "%";
		// 			else string = "5";
		// 			break;

		// 		case 54: 
		// 			if (shift) string = "^";
		// 			else string = "6";
		// 			break;

		// 		case 56: 
		// 			if (shift) string = "*";
		// 			else string = "8";
		// 			break;

		// 		case 189:
		// 			string = "-";
		// 			break;

		// 		case 187:
		// 			if (shift) string = "+";
		// 			else string = "=";
		// 			break;

		// 		case 190:
		// 			string = ".";
		// 			break;

		// 		case 191:
		// 			string = "/";
		// 			break;

		// 		case 67:
		// 			string = "C";
		// 			break;

		// 		default:
		// 			string = String.fromCharCode(keycode);
		// 			break;
		// 	}

		// 	if (calculator.validate(string)) {
		// 		var node = document.createTextNode(string);
		// 		calculatorTextInput.appendChild(node);
		// 	}
		// } 

		function ClearInputData () {
			calculatorTextInput.innerHTML = "";
			calculatorHistoryInput.innerHTML = "";		
			calculator.clearNumbers();	
		}

		function FeederInput (input) {
			switch (input) {
				case '+':
				case '-':
				case '*':
				case '/':
				case '%':
				case '^':
					console.log(input);
					break;

				case '=':
					console.log('equal');
					break;

				case '+/-':
					console.log('change');
					break;

			}
		}

	}, true);

})(Calculator)