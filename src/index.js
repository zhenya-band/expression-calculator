function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let values = [];
    let operations = [];
    let priorities = new Map([
        ['(', 0],
        [')', 0],
        ['+', 1],
        ['-', 1],
        ['*', 2],
        ['/', 2]
    ]);
    expr = expr.replace(/[-\+\*\(\)\/]/g, match => ' ' + match + ' ');
    let expression = expr.trim().split(/ +/g);

    let brackets = 0;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == '(') {
            brackets++;
        }
        if (expression[i] == ')') {
            brackets--;
        }
    }
    if (brackets != 0) {
        throw "ExpressionError: Brackets must be paired";
    }

    for (let i = 0; i < expression.length; i++) {

        if (expression[i] == '(') {
            operations.push(expression[i]);
            continue;
        }

        if (priorities.has(expression[i])) {
            if (operations.length == 0) {
                operations.push(expression[i]);
            } else {
                while (priorities.get(operations[operations.length - 1]) >= priorities.get(expression[i])) {

                    if (operations[operations.length - 1] == '(' && expression[i] == ')') {
                        operations.pop();
                        break;
                    }
                    let operand2 = parseFloat(values.pop());

                    let operand1 = parseFloat(values.pop());

                    switch (operations.pop()) {
                        case '+':
                            values.push(operand1 + operand2);
                            break;
                        case '-':
                            values.push(operand1 - operand2);
                            break;
                        case '*':
                            values.push(operand1 * operand2);
                            break;
                        case '/':
                            {
                                if (operand2 == 0) {
                                    throw new "TypeError: Division by zero.";
                                }
                                values.push(operand1 / operand2);
                            }
                    }
                }
                if (expression[i] != ')') {
                    operations.push(expression[i]);
                }
            }
        } else {

            values.push(expression[i]);
        }
    }
    while (operations.length != 0) {

        let operand2 = parseFloat(values.pop());
        let operand1 = parseFloat(values.pop());
        switch (operations.pop()) {
            case '+':
                values.push(operand1 + operand2);
                break;
            case '-':
                values.push(operand1 - operand2);
                break;
            case '*':
                values.push(operand1 * operand2);
                break;
            case '/':
                {
                    if (operand2 == 0) {
                        throw "TypeError: Division by zero.";
                    }

                    values.push(operand1 / operand2);
                }
        }
    }
    return values.pop();
}



module.exports = {
    expressionCalculator
}
