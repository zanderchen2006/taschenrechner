import { useState } from 'react';
import './App.css';

function App() {
    const [display, setDisplay] = useState<string>('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

    const inputDigit = (digit: number): void => {
        if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    }

    const inputDecimal = (): void => {
        if (waitingForSecondOperand) {
            setDisplay('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    }

    const clear = (): void => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    }

    const handleOperator = (nextOperator: string): void => {
        const inputValue: number = parseFloat(display);

        if (operator && waitingForSecondOperand) {
            setOperator(nextOperator);
            return;
        }

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    }

    const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
        switch (operator) {
            case '+': return firstOperand + secondOperand;
            case '-': return firstOperand - secondOperand;
            case '×': return firstOperand * secondOperand;
            case '÷': return firstOperand / secondOperand;
            default: return secondOperand;
        }
    }

    return (
        <div className="calculator">
            <div id="display">{display}</div>
            <div className="buttons">
                <button className="function" onClick={clear}>AC</button>
                <button className="function" onClick={() => setDisplay(String(-parseFloat(display)))}>+/-</button>
                <button className="function" onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
                <button className="operator" onClick={() => handleOperator('÷')}>÷</button>

                <button className="number" onClick={() => inputDigit(7)}>7</button>
                <button className="number" onClick={() => inputDigit(8)}>8</button>
                <button className="number" onClick={() => inputDigit(9)}>9</button>
                <button className="operator" onClick={() => handleOperator('×')}>×</button>

                <button className="number" onClick={() => inputDigit(4)}>4</button>
                <button className="number" onClick={() => inputDigit(5)}>5</button>
                <button className="number" onClick={() => inputDigit(6)}>6</button>
                <button className="operator" onClick={() => handleOperator('-')}>-</button>

                <button className="number" onClick={() => inputDigit(1)}>1</button>
                <button className="number" onClick={() => inputDigit(2)}>2</button>
                <button className="number" onClick={() => inputDigit(3)}>3</button>
                <button className="operator" onClick={() => handleOperator('+')}>+</button>

                <button className="number" id="zero" onClick={() => inputDigit(0)}>0</button>
                <button className="decimal" onClick={inputDecimal}>.</button>
                <button className="operator" onClick={() => handleOperator('=')}>=</button>
            </div>
            <div id="about">
                <p>created by Tim @ 10m</p>
            </div>

        </div>
    );
}

export default App;