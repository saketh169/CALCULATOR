// UPDATED LOGIC
// USED decimal.js OBJECT TO HANDLE LARGE CALCULATIONS

const nums = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".op");
let ans = document.querySelector("#value");
let lastButtonClicked = "";  // To track the last button clicked

let inputs = [];
let operators = [];
let result = 0;
let currentInput = "";  // Holds the current input value as a string


function display(show) {
    ans.innerHTML = show;
    
}

function show_output(result) {
    console.log("Result:", result);
    display(result);
}

/*
 encountering with 0.3 + 0.6 showing 0.899999 instead of 0.9 is due to the inherent imprecision of floating-point arithmetic
  in JavaScript. This is a common issue in many programming languages and is related to how numbers are represented internally.
*/

/*
The roundResult function is designed to round a number to a specified number of decimal places. This is useful for mitigating 
the effects of floating-point precision issues that can arise in JavaScript. The function uses scientific notation to achieve
 precise rounding
 

 
function roundResult(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
*/



function calculate() {

    if (inputs.length < 2 || operators.length === 0) return;  // Ensure there are enough inputs and operators
   
     // Remove all whitespace characters including newlines and spaces
    let Str1 = String(inputs[0]).replace(/\s/g, '');
    let Str2 = String(inputs[1]).replace(/\s/g, '');
     
    const num1 = new Decimal(Str1);
        const num2 = new Decimal(Str2);

        console.log(num1.toString());
        console.log(num2.toString());
        const operator = operators[0];

        // PERFORM OPERATIONS
        if (operator === "plus") {
            result = num1.plus(num2);
        } else if (operator === "minus") {
            result = num1.minus(num2);
        } else if (operator === "product") {
            result = num1.times(num2);
        } else if (operator === "div") {
            if (!num2.isZero()) {
                result = num1.div(num2);
            } else {
                show_output("Error");  // Handling division by zero
                return;
            }
        } else if (operator === "modulo") {
            result = num1.mod(num2);
        }

       // result = result.toDecimalPlaces(10); // Round to 10 decimal places
        
        let str=result.toString();
        console.log(str);
        
        if(str.length<=23){
        show_output(result);
        }else{
          show_output("OUTPUT IS TOO LONG");
          ans.style.fontSize = '70px'; 
        }
          
    inputs = [result]; // Keep the result for further calculations
    operators = [];
}

nums.forEach(num => {
    num.addEventListener("click", () => {
        const input = num.getAttribute("id");

        if (input === "dot") {
            if (!currentInput.includes(".")) {  // Check if there is already a decimal point
                currentInput += ".";
            }else{
                currentInput="Error"; // handling many decimal points
               
            }
        } else if (input === "zero" && currentInput === "") {
            // Handle leading zero
            currentInput = "0";
        } else if (input !== "equalto") {
            currentInput += num.innerHTML;
        }
         
            currentInput=(String(currentInput).replace(/\s/g, ''));
            if(currentInput.length<=23){
            let store=currentInput
            display(currentInput);
            }else{
                display("INPUT IS TOO LONG");
                ans.style.fontSize = '70px'; 
            }
         
        if (input === "equalto") {
           if (currentInput !== "") {
            if(currentInput.length<=23){
                inputs.push(currentInput);// push second input
                currentInput = "";
                calculate();
             }else{
                calculate();
             }
            }else if (inputs.length === 1) {
                // Show the result if "equalto" is clicked again after getting result
                show_output(inputs[0]);
                
            }
        }
        lastButtonClicked="num";// change to num
        console.log("Inputs :", inputs);
    });
});

ops.forEach(op => {
    op.addEventListener("click", () => {
        const input = op.getAttribute("id");

        if (input !== "AC" ) { 
            if (currentInput !== "") {  //push first input
                if(currentInput.length<=23){
                let store1=currentInput;
                inputs.push(currentInput);
                console.log("INPUTS :", inputs);
                currentInput = "";
                }else{
                    display("INPUT IS TOO LONG");
                    ans.style.fontSize = '70px'; 
                }
            }
            
            if (inputs.length === 2 || lastButtonClicked === "op") {// should calculate for both conditions
                calculate();
            }
    
            if (lastButtonClicked === "op" && operators.length > 0) {
                // Replace the last operator with the  operators[0] = input;
            } else {
                operators.push(input);
            }
            display(op.innerHTML);
        } else {
            inputs = [];
            operators = [];
            result = 0;
            currentInput = "";
            show_output(result);
            ans.style.fontSize = '100px'; 
        }
        lastButtonClicked = "op"; //change to op
        console.log("Operators:", operators);
        
    });
});