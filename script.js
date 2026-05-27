const display = document.getElementById("display");
 
function append(value) {
  display.value += value;
}
 
function clearDisplay() {
  display.value = "";
}
 
function deleteLast() {
  display.value = display.value.slice(0, -1);
}
 
// --- ПРОЦЕНТЫ ---
function processPercent(expression) {
  return expression.replace(/(\d+(\.\d+)?)%/g, (match, number, _, offset, full) => {
    const before = full.slice(0, offset);
 
    // ищем последний оператор
    const operatorMatch = before.match(/[\+\-\*\/](?!.*[\+\-\*\/])/);
    //ищет один из операторов + - * /
    const num = parseFloat(number);
 
    if (!operatorMatch) {
      return num / 100; // просто 50% -> 0.5
    }
 
    const operator = operatorMatch[0];
 
    // ищем левый операнд
    const leftMatch = before.match(/(\d+(\.\d+)?)\s*[\+\-\*\/]\s*$/);
 
    const left = leftMatch ? parseFloat(leftMatch[1]) : 0;
 
    switch (operator) {
      case "+":
      case "-":
        return left * (num / 100);
      case "*":
        return num / 100;
      case "/":
        return 1 / (num / 100);
      default:
        return num / 100;
    }
  });
}
 
// --- Подсчёт ---
function calculate() {
  try {
    let expr = display.value;
 
    expr = processPercent(expr);
 
    const result = Function(`return (${expr})`)();
 
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
