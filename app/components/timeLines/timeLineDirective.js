'use strict';
var _ = require('lodash');
function groupData(data) {
  var grouped = _.groupBy(data, 'time_period_start');
  var groupedData = [];
  for (var el in grouped) {
    var d = {};
    d.date = el;
    d.events = [];
    grouped[el].forEach(function (item) {
      var ev = {
        header: '',
        text: item.description,
        date: el
      };
      d.events.push(ev);
    });
    groupedData.push(d);
  }
  return groupedData;
}
function generateElement(header, text, messageDate) {
  var htmlHeader = '<li><span class="importo">' + header + '</span></li>';
  var htmlText = '<li><span class="causale">' + text + '</span> </li>';
  var htmlDate = '\t\t<li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>' + messageDate + '</small></p> </li>';
  var start = '<div class="col-sm-6  timeline-item right">\t<div class="row">        <div class="col-sm-11">            <div class="timeline-panel credits right">                <ul class="timeline-panel-ul right">';
  start += htmlHeader + htmlText;
  // + htmlDate;
  start += '</ul></div></div></div></div>';
  return start;
}
function generateBadge(date) {
  var moment = require('moment');
  require('../../../node_modules/moment/locale/ru');
  var d = moment(new Date(date));
  d = date.split('-')[0];
  var html = '<div class="timeline-badge">';
  //  var dayHtml = '  <span class="timeline-balloon-date-day">' + d.format('D') + '</span>';
  //  var monthHtml = '  <span class="timeline-balloon-date-month">' + d.format('MMM') + '</span>';
  var yearHtml = '  <span class="timeline-balloon-date-year">' + d + '</span>';
  html += yearHtml + '</div>';
  return html;
}
function generateDate(date) {
  var moment = require('moment');
  require('../../../node_modules/moment/locale/ru');
  var d = moment(new Date(date));
  var dayHtml = d.format('DD');
  var monthHtml = d.format('MM');
  var dateHtml = '<li layout="row"   layout-align="center center" ><span class="importo">' + dayHtml + '.' + monthHtml + '</span><ng-md-icon icon="remove" class="icon"></ng-md-icon></li>';
  // var html = '<div class=" timeline-movement">' + dateHtml+ '</div>';
  var start = '<div class="col-sm-6  timeline-item left">\t<div class="row">         <div class="col-sm-11">             <div class="timeline-panel credits left">                 <ul class="timeline-panel-ul left">';
  start += dateHtml;
  //+ htmlText + htmlDate;
  start += '</ul></div></div></div></div>';
  return start;
}
function generateBlock(date, events, needDate) {
  var html = '<div class="row timeline-movement">';
  html += generateBadge(date);
  events.forEach(function (e) {
    html += needDate ? generateDate(date) : '';
    html += generateElement(e.header, e.text, e.date);
  });
  html += '</div>';
  return html;
}
function generateTimeline(data, needDate) {
  var html = '<div class="container">';
  data.forEach(function (e) {
    html += generateBlock(e.date, e.events, needDate);
  });
  html += '</div>';
  return html;
}
function Vertical($compile) {
  return {
    restrict: 'E',
    scope: { data: '=' },
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          var needDate = templateAttrs.nodate == 'true' ? true : false;
          var data = groupData($scope.data);
          var html = '<div id="timeline">';
          html += generateTimeline(data, needDate);
          html += '</div>';
          templateElement.replaceWith($compile(html)($scope));
        }
      };
    }
  };
}
function Horizontal() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      startYear: '=',
      endYear: '=',
      selectEvent: '&'
    },
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          var data = [];
          var events = $scope.data.events;
          var options = {
            'width': '100%',
            'height': '350px',
            'style': 'box',
            lang :'ru',
            showCurrentTime: false
          };
          var moment = require('moment');
          require('../../../node_modules/moment/locale/ru');
          events.forEach(function (e) {
            data.push({
              'start': new Date(e.date),
              'content': e.text,
              'className': 'timeline-event'
            });
          });
          $scope.$watch('startYear', function(newVal) {
            timeline.setVisibleChartRange($scope.startYear, $scope.endYear);
            timeline.redraw();
          });
          $scope.$watch('endYear', function(newVal) {
            timeline.setVisibleChartRange($scope.startYear, $scope.endYear);
            timeline.redraw();
          });
          var timeline = new links.Timeline($(templateElement)[0]);
          links.events.addListener(timeline, 'select',
          function() {
             var sel = timeline.getSelection();
             if(sel[0]) {
               var obj = $scope.data.events[sel[0].row];
               $scope.selectEvent()(obj);
             }
          });
          timeline.draw(data, options);
        }
      };
    }
  };
}
module.exports = {
  vertical: Vertical,
  horizontal: Horizontal
};
