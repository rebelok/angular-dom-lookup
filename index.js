(function (angular) {
  'use strict';

  angular.module('rbl.dom', []);

  angular
    .module('rbl.dom')
    .factory('dom', ['$q', '$window', '$interval', domService]);

  function domService($q, $window, $interval) {
    return {
      querySelector: querySelector
    };

    function querySelector(selector, options) {
      options          = options || {};
      var timeout      = options.timeout || 0;
      var lookUpPeriod = options.interval || 50;

      var defer          = $q.defer();
      var lookUpInterval = $interval(lookUp, lookUpPeriod);

      defer.promise.cancel = cancel;

      if (timeout) {
        setTimeout(cancel, timeout);
      }

      lookUp();

      return defer.promise;

      function lookUp() {
        var element = $window.document.querySelector(selector);
        if (element) {
          defer.resolve(element);
          $interval.cancel(lookUpInterval);
        }
      }

      function cancel() {
        $interval.cancel(lookUpInterval);
        defer.reject('cancel');
      }
    }
  }
})(angular);
