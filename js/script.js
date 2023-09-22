let result = "";
let opeTemp = "",
  prefaceValue = 0,
  flag = false,
  flag2 = false;

let value = $(".value");
let ValueChanger = (target) => {
  if (target != "×" && target != "−" && target != "+") {
    let oldP = $("#p");
    if (oldP.empty()) {
      oldP.remove();
    }
    if (flag2 == true) {
      result = "";
      flag = false;
      flag2 = false;
      prefaceValue = 0;
      let oldUpdate = $("#update");
      if (oldUpdate.empty()) {
        oldUpdate.remove();
      }
    }
    if (value.text() == "0") {
      if (target == ".") {
        value.text("0.");
      } else {
        value.text(target);
      }
    } else {
      let temp = value.text();
      if (target == ".") {
        if (!value.text().includes(".")) {
          temp = temp + target;
          value.text(temp);
        }
      } else {
        temp = temp + target;
        value.text(temp);
      }
    }
  }
};

let operation = (operator) => {
  if (flag2 == true) {
    let oldP = $("#p");
    value.text(prefaceValue);
    prefaceValue = 0;
    flag = false;
    result = "";
    if (oldP.empty()) {
      oldP.remove();
    }
    opeTemp = operator;
    flag2 = false;
  }
  let oldUpdate = $("#update");
  if (oldUpdate.empty()) {
    oldUpdate.remove();
  }
  let update = $("<p>");
  update.attr("id", "update");
  if (value.text() != "") {
    if (prefaceValue != 0) {
      calculator(opeTemp, parseFloat(value.text()));
      if (flag == false) {
        result = result + value.text() + operator;
        value.text("");
        update.text(result);
        value.before(update);
        let p = $("<p>").text(prefaceValue);
        p.attr("id", "p");
        value.append(p);
        return;
      }
    }
    result = result + value.text() + operator;
    if (flag == false) {
      prefaceValue = parseFloat(value.text());
    }
    flag = true;
    opeTemp = operator;
    value.text("");
    update.text(result);
    value.before(update);
    let p = $("<p>").text(prefaceValue);
    p.attr("id", "p");
    value.append(p);
  } else if (result != "") {
    result = result.slice(0, -1) + operator;
    update.text(result);
    value.before(update);
  }
};

let button = $(".button");
for (let i = 4; i <= button.length - 2; i++) {
  (function (index) {
    button.eq(index).on("click", function () {
      ValueChanger(button.eq(index).text());
    });
  })(i);
}

let operator = $(".operator");
for (let j = 0; j <= operator.length - 2; j++) {
  (function (index) {
    operator.eq(index).on("click", function () {
      operation(operator.eq(index).text());
    });
  })(j);
}

let ac = $(".ac");
ac.on("click", function () {
  value.text("0");
  result = "";
  let oldUpdate = $("#update");
  oldUpdate.remove();
  prefaceValue = 0;
  flag = false;
});

let calculator = (operator, values) => {
  if (operator == "") {
    if(prefaceValue==0)
    {
      console.log("this for"+value.empty())
      prefaceValue=values
    }
    else
    {
      console.log("this for test"+value.empty())
     
      prefaceValue = prefaceValue
    }
  }
  if (operator == "+") {
    prefaceValue = prefaceValue + values;
  } else if (operator == "−") {
    prefaceValue = prefaceValue - values;
    if (prefaceValue == 0) {
      flag = false;
    }
  } else if (operator == "÷" && values != 0) {
    prefaceValue = prefaceValue / values;
  } else if (operator == "×") {
    prefaceValue = prefaceValue * values;
    if (prefaceValue == 0) {
      flag = false;
    }
  }
};

let equal = $(".equal");
equal.on("click", function () {
  ekul();
});
let ekul = () =>{
  calculator(opeTemp, parseFloat(value.text()));
  result = prefaceValue;
  value.text("");
  let oldUpdate = $("#update");
  if (oldUpdate.empty()) {
    oldUpdate.remove();
  }
  let p = $("<p>").text(prefaceValue);
  p.attr("id", "p");
  value.append(p);
  let update = $("<p>");
  update.attr("id", "update");
  update.text(result);
  value.before(update);
  flag2 = true;
  opeTemp=""
}

let keyboard = (event) => {
  let keyCode = event.keyCode;
  let shiftKey = event.shiftKey;

  switch (keyCode) {
    case 55:
      ValueChanger(button.eq(4).text());
      break;
    case 56:
      if (shiftKey) {
        operation(operator.eq(1).text());
      } else {
        ValueChanger(button.eq(5).text());
      }
      break;
    case 57:
      ValueChanger(button.eq(6).text());
      break;
    case 52:
      ValueChanger(button.eq(8).text());
      break;
    case 53:
      ValueChanger(button.eq(9).text());
      break;
    case 54:
      if (shiftKey) {
        operation(operator.eq(2).text());
      } else {
        ValueChanger(button.eq(10).text());
      }
      break;
    case 49:
      ValueChanger(button.eq(12).text());
      break;
    case 50:
      ValueChanger(button.eq(13).text());
      break;
    case 51:
      ValueChanger(button.eq(14).text());
      break;
    case 48:
      ValueChanger(button.eq(16).text());
      break;
      case 190: 
      ValueChanger(button.eq(17).text());
      break
    case 187:
    case 107:
      if(shiftKey)
      {
        ekul();
      }
      else
      {
        operation(operator.eq(3).text());
      }
      break;
    case 191:
    case 111:
      operation(operator.eq(0).text());
      break;
    case 189:
      operation(operator.eq(2).text());
      break;
    case 13:
      ekul();
    case 8:
      Backspace();
    default:
      
      console.log("nothing happens");
  }
};
$(document).on("keydown", function (event) {
  keyboard(event);
});
let Backspace = ()=>{
  let dd = value.text();
  dd = dd.slice(0,-1)
  if(dd=="")
   dd="0";
  value.text(dd);
}