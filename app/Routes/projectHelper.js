function millionsFunction (project) {
    for (var type in project.finance){
        for(var val in project.finance[type]) {
            project.finance[type][val] = project.finance[type][val] / 1000000.0;
         }
     }
  return project;
}

function prepareFinance(finance) {
  var years =[];
  var valueBudget =[];
  var valueOwnBudget =[];
  var sumBudget = 0;
  var sumOwnBudget = 0;
  for (var p in finance["Финансирование из собственных средств"]){
    years.push(p);
    valueOwnBudget.push(finance["Финансирование из собственных средств"][p]);
    sumOwnBudget = sumOwnBudget + finance["Финансирование из собственных средств"][p];
  };
  for (var p in finance["Финансирование за счет бюджетных средств"]){
    valueBudget.push(finance["Финансирование за счет бюджетных средств"][p]);
    sumBudget = sumBudget + finance["Финансирование за счет бюджетных средств"][p]
  };
  years.sort();
  var start = years[0];
  var end = years[years.length-1];
  finance["Финансирование из собственных средств"]['Тип'] = 'Внебюджет, млн.р.';
  finance["Финансирование за счет бюджетных средств"]['Тип'] = 'Бюджет, млн.р.';
  var a=[finance["Финансирование из собственных средств"],finance["Финансирование за счет бюджетных средств"]];
  return {finance:a, start: start, end: end, years: years, valueBudget: valueBudget, valueOwnBudget: valueOwnBudget, sumBudget: sumBudget, sumOwnBudget: sumOwnBudget};
}

module.exports = {
  prepareValues: millionsFunction,
  prepareFinance: prepareFinance
}
