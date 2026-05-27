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
 
/** --- ПРОЦЕНТЫ ---
ДАННАЯ ФУНКЦИЯ:
               ИЩЕТ %
               ОПРЕДЕЛЯЕТ ОПЕРАТОР
               НАХОДИТ ЛЕВОЕ ЧИСЛО
               РЕШАЕТ КАК СЧИТАТЬ ПРОЦЕНТ
               ЗАМЕНЯЕТ % НА ГОТОВОЕ ЗНАЧЕНИЕ
 **/
function processPercent(expression) {
  return expression.replace(/(\d+(\.\d+)?)%/g, (match, number, _, offset, full) => {
   //ТУТ РЕГУЛЯРКА ИЩЕТ ПРОЦЕНТЫ, CALLBACK РЕШАЕТ ЧЕМ ЗАМЕНИТЬ НАЙДЕННОЕ

   
   const before = full.slice(0, offset); // берёт всё до процента
 
    // ищем последний оператор
    const operatorMatch = before.match(/[\+\-\*\/](?!.*[\+\-\*\/])/);
    //ищет один из операторов + - * /   БЕРЕТСЯ ПОСЛЕДНИЙ ОПЕРАТОР 100+20- НАЙДЕТСЯ -
    const num = parseFloat(number);
 
    if (!operatorMatch) {
      return num / 100; // просто 50% -> 0.5
    }
 
    const operator = operatorMatch[0];
 
    // ищем левОЕ ЧИСЛО
    const leftMatch = before.match(/(\d+(\.\d+)?)\s*[\+\-\*\/]\s*$/);
 
    const left = leftMatch ? parseFloat(leftMatch[1]) : 0;

    // ЛОГИКА КАЛЬКУЛЯТОРА
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
 
    expr = processPercent(expr); // 
 
    const result = Function(`return (${expr})`)(); // ПРОСТЫЕ ВЫЧИСЛЕНИЯ
 
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
