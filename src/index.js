function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    function getPriority(token){
      if(token == '*' || token == '/') return 3;
      else if(token == '+' || token == '-') return 2;
      else if(token == '(') return  1;
      else if(token == ')') return -1;
      else return 0;
    }
    function strToRpn(expr) {
      let stackNum =[];
      let stackSymb = [];
      if(expr.length==3) arr = expr.split("");
      else arr = expr.trim().split(" ");
      for(char of arr){
        let priority = getPriority(char);
        if (priority === 0) stackNum.push(char);
        if (priority === 1) stackSymb.push(char);
        if (priority > 1) {
          while(!stackSymb.length ==0){
             if(getPriority(stackSymb[stackSymb.length-1])>=priority){
               stackNum = stackNum.concat(stackSymb.pop());
             }else break;
          }
          stackSymb.push(char);
        }
        if(priority === -1){
          while(getPriority(stackSymb[stackSymb.length-1]) != 1){
            stackNum = stackNum.concat(stackSymb.pop());
          }
          stackSymb.pop();
        }
      }
      while(!stackSymb.length ==0){
        stackNum = stackNum.concat(stackSymb.pop());
      }
      return stackNum;
    }
    function rpnToRes(stackNum) {
      let stack3 =[];
      stackNum.map(function(){
        for (let k = 0; k < stackNum.length; k++){
        if(stackNum[k]==="") stackNum.splice(k,1);
      }
      });
      stackNum = stackNum.map(function(el){
        if(getPriority(el)==0)return +el;
        else return el;
      });
      for (let i = 0; i < stackNum.length; i++) {
        if (getPriority(stackNum[i]) == 0) stack3.push(stackNum[i]);
        if (getPriority(stackNum[i]) > 1){
          let x = stack3.pop(),
              y = stack3.pop();
          if(stackNum[i] == '-') stack3.push(y-x);
          if(stackNum[i] == '+') stack3.push(y+x);
          if(stackNum[i] == '*') stack3.push(y*x);
          if(stackNum[i] == '/') stack3.push(y/x);
        }
      }
      return stack3.pop();
    }
    if(Number.isNaN(rpnToRes(strToRpn(expr)))) throw new Error("ExpressionError: Brackets must be paired");
    else if(!isFinite(rpnToRes(strToRpn(expr)))) throw new Error("TypeError: Division by zero.");
    else return rpnToRes(strToRpn(expr));
}
module.exports = {
    expressionCalculator
}
