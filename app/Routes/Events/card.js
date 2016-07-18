'use strict';
function findComplexChain(spaceTreeData, id) {
  var stack = [];
  for(var i = 0; i < spaceTreeData.length; i++) {
    stack.push(spaceTreeData[i]);
    spaceTreeData[i].currentChain = [];
  }
  while(stack.length > 0) {
    var newStack = [];
    for(var i = 0; i < stack.length; i++) {
      var currentItem = {id: stack[i].id, type: stack[i].object_type};
      if(stack[i].id == id && stack[i].object_type == 3) {
        return stack[i].currentChain.concat(currentItem);
      } else {
        if(stack[i].children && stack[i].children.length > 0) {
          stack[i].children.forEach((child) => {
            child.currentChain = stack[i].currentChain.concat(currentItem);
            newStack.push(child);
          });
        }
      }
    }
    stack = newStack;
  }
  return -1;
}

module.exports = {
  url: '/:eventId',
  abstract: true,
  views: {
    'content@': {
      templateUrl: 'app/Routes/Events/card/events-card.html',
      controller: function(event,$scope,tabstripData, timelineData,  $state, spaceTreeData) {
        $scope.tabstripData = tabstripData;
        $scope.event = event;

        $scope.timelineSelect = function(event) {

            $state.go("home.events.card.section", { "eventId": event.id, "type": "general"});
        }
        //Time Line horizontal code
        var data = _.cloneDeep(timelineData);
        data.data.forEach((item) => {
          item.text = item.title;
        })
        $scope.data = data.data;
        $scope.timeLineHorizontalData = {events: data.data};
        $scope.timespanSelected = function(date) {
          var a = _.cloneDeep(date);
          var b = _.cloneDeep(date);
          a.setFullYear(date.getFullYear() - 1);
          b.setFullYear(date.getFullYear() + 1);
          $scope.startYear = a;
          $scope.endYear = b;
        }
        $scope.eventChosen = function(event) {
          $state.go("home.events.card.section", { "eventId": event.id, "type": "general"});
        }

        for(var s in $scope.event.complexes) {
          var chain = findComplexChain(spaceTreeData, $scope.event.complexes[s].id);
          if(chain !== -1) {
            $scope.event.complexes[s].sectionId = chain[0].id;
            $scope.event.complexes[s].subsectionId = chain[chain.length - 2].type == 2 ? chain[chain.length - 2].id : -1;

          }
        }

      },
      resolve: {
        event: function event($eventsFactory,$stateParams) {
          var id = $stateParams.eventId;
          return $eventsFactory.getById(id).then(function (data) {
            return data.data.data;
          });
        },
        tabstripData: function tabstripData($stateParams) {
            var tabs = [];
            tabs.push({
              name: 'Общие сведения',
              state: 'projectSection',
              type: 'general'
            });
            tabs.push({
              name: 'Связанные проекты',
              state: 'projectSection',
              type: 'relatedProjects'
            });
            tabs.push({
              name: 'Связанные космические комплексы',
              state: 'projectSection',
              type: 'relatedSpaceComplexes'
            });
            return tabs;
        },
        timelineData: function($timelineService) {
          return $timelineService.getData('/data/events').then(function (data) {
            return data.data;
          });
        },
        spaceTreeData: function ($accordion) {
                  return $accordion.getTree('data/spacetree').then(function (response) {
                    return response.data.data;
                  });
                }
      }
    }
  },
  ncyBreadcrumb: { label: 'Карточка события' }
}
