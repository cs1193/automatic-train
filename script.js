(function (Calculator) {

	document.addEventListener("DOMContentLoaded", function () {

		console.clear();
			console.log("%c %c %c Calculator | Chandresh %c %c %c http://chandreshrm.name", "background: #f2f2f2","background: #dddddd","color: #222222; background: #cccccc;","background: #dddddd","background: #f2f2f2","background: #ffffff");

		var calculator = new Calculator();

		var calculatorButton = document.querySelectorAll('.calculatorButton');
		var calculatorTextInput = document.querySelector('.calculatorTextInput');
		var calculatorHistoryInput = document.querySelector('.calculatorHistory');
		var calculatorMessage = document.querySelector('.calculatorMessage');

		var MAXIMUM_TEXT_INPUT_LENGTH = 10;
		var MAXIMUM_HISTORY_HOLD_LENGTH = 2;


		for (var index = 0; index < calculatorButton.length; index++) {
			calculatorButton[index].addEventListener('click', IssueOperative, true);
		}

		document.addEventListener('keydown', IssueKeyOperative, false);

		calculatorTextInput.addEventListener('click', FocusTextInput, false);

		function IssueOperative () {
			var string = this.getAttribute('data-operative');
			FeederInputSelector(string);
		}

		function IssueKeyOperative (event) {
			var keycode = event.keyCode;
			var shift = event.shiftKey;
			var string = null;

			switch (keycode) {
				case 53:
					string = (shift) ? "%" : "5";
					break;

				case 54:
					string = (shift) ? "^" : "6";
					break;

				case 56:
					string = (shift) ? "*" : "8";
					break;

				case 67:
					string = "C";
					break;

				case 187:
					string = (shift) ? "+" : "=";
					break;

				case 189:
					string = "-";
					break;

				case 190:
					string =  ".";
					break;

				case 191:
					string = "/";
					break;

				default:
					string = String.fromCharCode(keycode);
					break;
			}

			FeederInputSelector(string);
		}

		function FeederInputSelector (input) {
			switch (input) {
				case 'C':
					ClearInputData();
					break;

				case '+':
				case '-':
				case '*':
				case '/':
				case '%':
				case '^':
					ExecuteOperator(input);
					break;

				case '=':
					AnswerExecution();
					break;

				case '+/-':
					InvertSign();
					break;


				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				case '0':
					DisplayInputText(input);
					break;


				case '.':
					DecimalExpression();
					break;

			}
		}

		function ClearInputData () {
			calculatorTextInput.innerHTML = "";
			calculatorHistoryInput.innerHTML = "";	
			calculatorMessage.innerHTML = "";	
			calculator.clearNumbers();	
		}

		function DisplayInputText (input) {
			calculatorMessage.innerHTML = "";	
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			if (currentTextLength < MAXIMUM_TEXT_INPUT_LENGTH) {
				var node = document.createTextNode(input);
				calculatorTextInput.appendChild(node);
			} else {
				calculatorMessage.innerHTML = "MAXIMUM INPUT LENGTH REACHED";
			}
		}

		function FocusTextInput () {
			var caretOffset = 0;
			var currentElement = this;
			var currentDocument = currentElement.ownerDocument || currentElement.document;
			var currentWindow = currentDocument.defaultView || currentDocument.parentWindow;
			var selection;

			if (typeof currentWindow.getSelection != "undefined") {
				selection = currentWindow.getSelection();
				if (selection.rangeCount > 0) {
					var range = currentWindow.getSelection().getRangeAt(0);
					var previousCaretRange = range.cloneRange();
					previousCaretRange.selectNodeContents(currentElement);
					previousCaretRange.setEnd(range.endContainer, range.endOffset);
					caretOffset = previousCaretRange.toString().length;
				}

			} else if ((selection = currentDocument.selection) && selection.type != "Control") {
				var textRange = selection.createRange();
				var previousCaretRange = currentDocument.body.createTextRange();
				previousCaretRange.moveToElementText(currentElement);
				previousCaretRange.setEndPoint("EndToEnd", textRange);
				caretOffset = previousCaretRange.text.length;
			}

			return caretOffset;
		}

		function ExecuteOperator (operator) {
			calculatorMessage.innerHTML = "";	
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			calculatorTextInput.innerHTML = "";

			calculator.passNumber(currentText);
			calculator.passOperator(operator);	
			if (calculator.getNumberLength() === MAXIMUM_HISTORY_HOLD_LENGTH) {	

				var history = document.createTextNode(" " + calculator.numbers[1]);
				calculatorHistoryInput.appendChild(history);

				var recipient = calculator.makeCalculation();

				if (!recipient && recipient !== 0) {
					calculatorMessage.innerHTML = "DIVIDE BY ZERO";
					calculatorTextInput.innerHTML = undefined;
				} else {
					recipient = recipient.toString().substring(0, MAXIMUM_TEXT_INPUT_LENGTH);
					calculatorTextInput.innerHTML =  recipient;
					calculator.clearNumbers();
				}
			} else {
				calculatorHistoryInput.innerHTML = "";
				var history = document.createTextNode(calculator.numbers[0] + " " + operator);
				calculatorHistoryInput.appendChild(history);
			}

		}

		function AnswerExecution () {
			calculatorMessage.innerHTML = "";	
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			calculatorTextInput.innerHTML = "";

			calculator.passNumber(currentText);
			if (calculator.getNumberLength() === MAXIMUM_HISTORY_HOLD_LENGTH) {	

				var history = document.createTextNode(" " + calculator.numbers[1]);

				calculatorHistoryInput.appendChild(history);

				var recipient = calculator.makeCalculation();
				if (!recipient && recipient !== 0) {
					calculatorMessage.innerHTML = "DIVIDE BY ZERO";
					calculatorTextInput.innerHTML = undefined;
				} else {
					recipient = recipient.toString().substring(0, MAXIMUM_TEXT_INPUT_LENGTH);
					calculatorTextInput.innerHTML =  recipient;
					calculator.clearNumbers();
				}
			}
		}

		function InvertSign () {
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			var expression = new RegExp(/^-[0-9]*$/, 'g');
			var negative = expression.test(currentText);

			if (negative) {
				var negExp = new RegExp(/^-/, 'g');
				var splittext = currentText.split(negExp);
				calculatorTextInput.innerHTML =(splittext[1] ? splittext[1] : "");
			} else {
				calculatorTextInput.innerHTML = "-" + (currentText ? currentText : "");
			}

		}

		function DecimalExpression () {
			calculatorMessage.innerHTML = "";	
			var currentText = (calculatorTextInput.textContent || calculatorTextInput.innerText);
			var currentTextLength = currentText.length;

			var dotExpression = new RegExp(/[.]/, 'g');
			var dotPresent = dotExpression.test(currentText);

			if (dotPresent) {
				calculatorMessage.innerHTML = "DECIMAL ALREADY PRESENT";
				return false;
			} else {
				calculatorTextInput.innerHTML = currentText + ".";
			}

		}

	}, true);

})(Calculator)