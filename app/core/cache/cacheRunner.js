function runner($timeout, $sectionFactory,$interval,$subsectionFactory,$projectFactory,$errorHandler) {
  var self = this;
  var entities = [
    {type: 'section', factory: $sectionFactory},
    {type:'subsection', factory: $subsectionFactory},
    {type:'project', factory: $projectFactory}];
  var actionsLIFO = [];
  var workerId = -1;
  var errorHandler = $errorHandler.handleError;

  var $$options = {};

  this.setOptions = function(options) {
    angular.extend($$options, options)
  }
  this.startCacheRunner = function() {
    var cached = {};
    $interval(() => {
      var entitiesArrs = {};
      entities.forEach((item) => {
        entitiesArrs[item.type] = {elements: $('[cacheType="'+item.type+'"]:visible'), factory: item.factory};
      });
      for(var e in entitiesArrs) {
        for(var i = 0; i < entitiesArrs[e].elements.length; i++) {
          var id =  $(entitiesArrs[e].elements[i]).attr('elementid');
          if(!cached[`type:${e}||id:${id}`]) {
            actionsLIFO.unshift((function(elType, elId) {
              entitiesArrs[elType].factory.getById(elId).then(
                (data)=>{console.log(`${elType} with id ${elId} cached successfully`); return data;},
              (message) => {
                if(errorHandler) message.config && message.config.url ? errorHandler('httpGet', message.config.url ) : errorHandler('unknown', 'Неизвестная ошибка');
                self.stopCacheProcess();
              });
            }).bind(this, e, id));
            cached[`type:${e}||id:${id}`] = 1;
          }
        }
      }
    },$$options.checkRate);
  };
  this.runCacheProcess = function() {
    workerId = $interval(()=> {
      if(actionsLIFO.length > 0) {
        var f = actionsLIFO.pop();
        f();
      }
    },$$options.cacheRate)
  };
  this.stopCacheProcess = function() {
     $interval.cancel(workerId);
  }
}

module.exports = runner;
