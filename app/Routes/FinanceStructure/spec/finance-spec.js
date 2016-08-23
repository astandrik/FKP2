var testedModule = require('../financeStructureHelper.js');
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
    entity.Questions.forEach((q, i) => expect(JSON.stringify(func.apply(this,[q].concat(args)))).toEqual(JSON.stringify(entity.Answers[i])));
  }
}

describe("Testing finance section", function() {
  it('Testing section prepare', function() {
    var testSection = testData.Section;
    expect(testedModule.prepareSection(testSection.Question)).toEqual(testSection.Answer);
  });

  it('Testing getting finance tables', function() {
    var testTables = testData.testFinanceTables;
    expect(testedModule.getFinanceTables(testTables.Question)).toEqual(testTables.Answer);
  });

  it('Testing idList', function() {
    var testId = testData.idList;
    expect(testedModule.makeIdList(testId.Question)).toEqual(testId.Answer);
  });

  it("Testing get node data info", () => {
    var project = testData.projectNodeData;
    var subsection = testData.subsectionNodeData;
    var nestedSubsection = testData.nestedSubsectionNodeData;
    var section = testData.sectionNodeData;
    expect(testedModule.getNodeInfo(project.Question, 'initialHref')).toEqual(project.Answer);
    expect(testedModule.getNodeInfo(subsection.Question, 'initialHref/7')).toEqual(subsection.Answer);
    expect(testedModule.getNodeInfo(nestedSubsection.Question, 'initialHref')).toEqual(nestedSubsection.Answer);
    expect(testedModule.getNodeInfo(section.Question, 'initialHref')).toEqual(section.Answer);
  });

  it("Testing sumObject", () => {
    testEntity(testData.sumObjectTest, testedModule.sumObject);
  })

  it("Testing data tree traversal", () => {
    testEntity(testData.treeTraverseTest, testedModule.traverseTree, ['initialHref?paramA=123&paramB=321'],objectTreesEqual);
  })

  it("Testing find in tree func", ()=> {
    testEntity(testData.findElemsInTreeTest, testedModule.findElemsInTree, [243,0]);
    testEntity(testData.findElemsInUpperTreeTest, testedModule.findElemsInTree, [3,2]);
  });

});
