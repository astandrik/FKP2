'use strict';
module.exports = function eventsFactory($httpCached) {
  return {
    getById: function getById(id) {
      return $httpCached.get('data/event?id=' + id);
    }
  };
};
