var testedModule = require('../spaceComplexHelper.js');
var testData = require('./testData.js');

function nodesEqual(a,b) {
  return Object.keys(a).filter(x=> x!="children").map((key) => a[key] == b[key]).every(x => x)
}

function objectTreesEqual(na ,nb) {
  return na.every((arr, i) => nodesEqual(na[i], nb[i]) && (na[i].children ? objectTreesEqual(na[i].children, nb[i].children) : true));
}

var testEntity = (entity, func, args, compareFunc) => {
  if(compareFunc) {
    entity.Questions.forEach((q, i) =>{
      var answer = compareFunc(func.apply(this,[q].concat(args)), entity.Answers[i]);
      if(!answer) {
        console.log(JSON.stringify(func.apply(this,[q].concat(args))));
        console.log(JSON.stringify(entity.Answers[i]));
      }
      expect(answer).toEqual(true)
    });
  } else {
    entity.Questions.forEach((q, i) => expect(JSON.stringify(func.apply(this,q))).toEqual(JSON.stringify(entity.Answers[i])));
  }
}


describe("Testing complex section", function() {
  it("Testing getting sectionName in tree func", ()=> {
    testEntity(testData.treeSearchTest, testedModule.getComplexType);
  });
});
