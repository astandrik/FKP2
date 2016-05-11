function runner($timeout, $sectionFactory,$interval,$subsectionFactory,$projectFactory) {
  var entities = [
    {type: 'section', factory: $sectionFactory},
    {type:'subsection', factory: $subsectionFactory},
    {type:'project', factory: $projectFactory}];
  this.startCacheRunner = function() {
    $interval(() => {
      var entitiesArrs = {};
      entities.forEach((item) => {
        entitiesArrs[item.type] = {elements: $('[cacheType="'+item.type+'"]:visible'), factory: item.factory};
      });
      for(var e in entitiesArrs) {
        for(var i = 0; i < entitiesArrs[e].elements.length; i++) {
          entitiesArrs[e].factory.getById($(entitiesArrs[e].elements[i]).attr('elementid'));
        }
      }
    },2000);
  }
}

module.exports = runner;
