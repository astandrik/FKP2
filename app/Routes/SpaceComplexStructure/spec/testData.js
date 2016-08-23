var tree = [{
     "id": 1,
     "name": "Тестовое поле1",
     "object_type": 2,
     "class_id": 1,
     "parent_id": 0,
     "parent_type": 1,
     "children": [{
         "id": 2,
         "name": "Независимые",
         "object_type": 2,
         "class_id": 2,
         "parent_id": 1,
         "parent_type": 2,
         "children": [{
             "id": 1,
             "name": "Гонец-М (№ 24 - 29)",
             "object_type": 3,
             children: {}
         }]
     }]
 }, {
     "id": 3,
     "name": "Тестовое поле2",
     "object_type": 2,
     "class_id": 1,
     "parent_id": 0,
     "parent_type": 1,
     "children": [{
         "id": 4,
         "name": "Независимые",
         "object_type": 2,
         "class_id": 2,
         "parent_id": 1,
         "parent_type": 2,
         "children": [{
             "id": 5,
             "name": "Гонец-М (№ 24 - 29)",
             "object_type": 3,
             children: {}
         }]
     }]
 },
 {
     "id": 5,
     "name": "Тестовое поле3",
     "object_type": 2,
     "class_id": 1,
     "parent_id": 0,
     "parent_type": 1,
     "children": [{
         "id": 6,
         "name": "Независимые",
         "object_type": 2,
         "class_id": 2,
         "parent_id": 1,
         "parent_type": 2,
         "children": [{
             "id": 7,
             "name": "Гонец-М (№ 24 - 29)",
             "object_type": 3,
             children: {}
         }]
     }]
 }];


var treeSearchTest = {
  Questions : [
    [tree, 5],
    [tree, 7],
    [tree, 6]
  ],
  Answers: [
    'Тестовое поле2',
    'Тестовое поле3',
    'Nothing'
  ]
}

module.exports = {
  treeSearchTest
}
