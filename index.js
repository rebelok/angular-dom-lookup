(function () {
  'use strict';
  
  angular.module('rbl.dom', []);

  angular
    .module('rbl.dom')
    .factory('dom', domService);

  function domService($q, $window, $interval) {
    return {
      querySelector: querySelector
    };

    function querySelector(selector, timeout) {
      var defer          = $q.defer();
      var lookUpInterval = $interval(lookUp, 50);

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
})();
