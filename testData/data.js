(function(){
  window.testTree = [{
    name: 'Родительский проект1',
    id: 1,
    children: [
      {
        name: 'Дочерний проект1',
        id:2,
        children: [
          {
            name: 'Внучатый проект1',
            id:2,
          },
          {
            name: 'Внучатый проект2',
            id:2,
          },
          {
            name: 'Внучатый проект3',
            id:2,
            children: [
              {
                name: 'Правнучатый проект1',
                id:5
              },
              {
                name: 'Правнучатый проект2',
                id:5
              }
            ]
          }
        ]
      },
      {
        name: 'Дочерний проект2',
        id:3
      }
    ]
  },
  {
    name: 'Родительский проект2',
    id:4,
    children: [
      {
        name: 'Дочерний проект3',
        id:5
      }
    ]
  }]
}());
