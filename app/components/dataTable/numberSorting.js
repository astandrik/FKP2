function moneyToFloat(money) {
  return parseFloat(money.replace(/\s/g,'').replace(',','.'));
}

function numberSorting(a, b, direction) {
  var result =  moneyToFloat(a) > moneyToFloat(b) ? 1 : -1;
  return result;
}

module.exports = numberSorting;
