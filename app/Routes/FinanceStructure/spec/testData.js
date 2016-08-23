var testFinanceTables = require('./finance-tables.js')

var Section = {
    Question: {
        'first': {
            2015: '1000000',
            2016: '2000000'
        },
        'second': {
            2017: '3000000',
            2018: '4000000'
        }
    },
    Answer: {
        'first': {
            2015: 1,
            2016: 2
        },
        'second': {
            2017: 3,
            2018: 4
        }
    }
}

var projectNodeData = {
    Question: {
        "id": 1,
        "name": "Проектно-поисковые исследования по перспективным космическим комплексам связи, вещания, ретрансляции, поиска и спасания",
        "object_type": 0,
        "type_id": null,
        "parent_id": 1,
        "section_id": 1,
        "parent_type": 1
    },
    Answer: {
        "href": "initialHref/project/1",
        'cacheType': 'project'
    }
}

var subsectionNodeData = {
    Question: {
        "id": 12,
        "name": "Разработка и внедрение прогрессивных технологий машиностроения, приборостроения и материаловедения ",
        "object_type": 1,
        "type_id": null,
        "parent_id": 7,
        "section_id": 1,
        "parent_type": 1,
    },
    Answer: {
        "href": "initialHref/12",
        'cacheType': 'subsection'
    }
}

var nestedSubsectionNodeData = {
    Question: {
        "id": 12,
        "name": "Разработка и внедрение прогрессивных технологий машиностроения, приборостроения и материаловедения ",
        "object_type": 1,
        "type_id": null,
        "parent_id": 7,
        "section_id": 1,
        "parent_type": 2,
    },
    Answer: {
        "href": "initialHref/subsection/12",
        'cacheType': 'subsection'
    }
}

var sectionNodeData = {
    Question: {
        "id": 12,
        "object_type": 2,
        "type_id": null,
        "parent_id": 7,
        "section_id": 1,
        "parent_type": 0,
    },
    Answer: {
        "href": "initialHref/section/12",
        'cacheType': 'section'
    }
}

var idList = {
    Question: [{
        id: 1
    }, {
        id: 2
    }, {
        id: 3
    }],
    Answer: [1, 2, 3]
}

var sumObjectTest = {
  Questions: [{
    a: 123,
    b: 234,
    c: 345
  },
  {}],
  Answers: [702, 0]
}


var tree =   [
   {
      "parent_type":0,
      "id":3,
      "object_type":2,
      "parent_id":0,
      "children":[
         {
            "parent_type":2,
            "id":242,
            "object_type":0,
            "parent_id":3,
            "children":[

            ]
         },
         {
            "parent_type":2,
            "id":243,
            "object_type":0,
            "parent_id":3,
            "children":[

            ]
         }
      ]
   }
]

var findElemsInTreeTest = {Questions: [tree], Answers: [[{
   "parent_type":2,
   "id":243,
   "object_type":0,
   "parent_id":3,
   "children":[

   ]
}]]}

var findElemsInUpperTreeTest = {Questions: [tree], Answers: [
  tree
]}

var treeTraverseTest = {Questions: [
  tree
],
Answers: [[
  {
     "parent_type":0,
     "id":3,
     "elementId":3,
     "object_type":2,
     "parent_id":0,
     "cacheType": 'section',
     "href": "initialHref/section/3?paramA=123&paramB=321",
     "children":[
        {
           "parent_type":2,
           "id":242,
           "elementId":242,
           "object_type":0,
           "parent_id":3,
           "cacheType": 'project',
           "href": "initialHref/section/3/project/242?paramA=123&paramB=321",
           "children":[

           ]
        },
        {
           "parent_type":2,
           "id":243,
           "elementId":243,
           "object_type":0,
           "parent_id":3,
           "cacheType": 'project',
           "href": "initialHref/section/3/project/243?paramA=123&paramB=321",
           "children":[

           ]
        }
     ]
  }
]]}

module.exports = {
    idList,
    testFinanceTables,
    Section,
    projectNodeData,
    subsectionNodeData,
    nestedSubsectionNodeData,
    sectionNodeData,
    sumObjectTest,
    treeTraverseTest,
    findElemsInTreeTest,
    findElemsInUpperTreeTest
}
