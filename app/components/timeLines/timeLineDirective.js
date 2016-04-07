'use strict';

function generateElement(header, text, messageDate) {
  var htmlHeader =  '<li><span class="importo">' + header + '</span></li>';
  var htmlText = '<li><span class="causale">' + text + '</span> </li>';
  var htmlDate = '		<li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>' + messageDate + '</small></p> </li>';
  var start = '<div class="col-sm-6  timeline-item">	<div class="row">\
        <div class="col-sm-11">\
            <div class="timeline-panel credits">\
                <ul class="timeline-panel-ul">';
  start += htmlHeader + htmlText + htmlDate;
  start += '</ul></div></div></div></div>';
  return start;
}

function generateBadge(date) {
  var moment = require('moment');
  require('../../../node_modules/moment/locale/ru');
  var d = moment(new Date(date));
  var html = '<div class="timeline-badge">';
  var dayHtml = '  <span class="timeline-balloon-date-day">' + d.format('D') + '</span>';
  var monthHtml = '  <span class="timeline-balloon-date-month">' + d.format('MMM') + '</span>';
  html += dayHtml + monthHtml + '</div>';
  return html;
}

function generateBlock(date, events) {
  var html = '<div class="row timeline-movement">';
  html += generateBadge(date);
  events.forEach((e) => {
    html += generateElement(e.header, e.text, e.date);
  });
  html += '</div>';
  return html;
}

function generateTimeline(data) {
  var html = '<div class="container">';
  data.forEach((e) => {
    html+= generateBlock(e.date, e.events);
  })
  html += '</div>';
  return html;
}

function Vertical($compile) {
  return{
    restrict: 'E',
    scope: {data: '='},
    compile: function(templateElement, templateAttrs) {
      return {
        pre: ($scope) => {
          var html = '<div id="timeline">';
          html += generateTimeline($scope.data);
          html += '</div>';
          templateElement.replaceWith($compile(html)($scope));
        }
      }
    }
  }
  };

function Horizontal() {
  return{
    restrict: 'E',
    scope: {data: '='},
    compile: function(templateElement, templateAttrs) {
      return {
        pre: ($scope) => {
          var data = [];
          var events = $scope.data.events;
          var options = {
                  "width":  "100%",
                  "height": "150px",
                  "style": "box",
                  showCurrentTime: false
                };
          var moment = require('moment');
          require('../../../node_modules/moment/locale/ru');
          events.forEach((e) => {
            data.push({
              'start': new Date(moment(e.date,'DD.MM.YYYY').format()),
              'content': e.text,
              'className': 'timeline-event'
            })
          });
          var timeline = new links.Timeline($(templateElement)[0]);
          timeline.draw(data, options);
        }
      }
    }
  }
}

module.exports = {
  vertical: Vertical,
  horizontal: Horizontal
}
