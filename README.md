# angular-dom-lookup
A service for DOM lookup with promises

##Install

###NPM
```bash
npm install angular-dom-lookup
```
##Usage
###Require `rbl.dom` and inject the `dom` service
```
angular.module('app', [
    'rbl.dom'
]).controller('Ctrl', function($scope, dom){
...
});
```
###Look up the DOM by selector
```
 dom.querySelector('.container-selector'[, options])
     .then(function (container){
       $scope.container = angular.element(container);
     });
```
### Options
####timeout (ms)
Period after which look up would be canceled and promise would be rejected.
#####Default: 0 (Never)
```
var options = {
  timeout: 1000
};
var lookUpPromise = dom.querySelector('.selector', options);
    
```
####interval (ms) 
Period of look up function execution
#####Default: 50 ms
```
var options = {
  interval: 1000
};
var lookUpPromise = dom.querySelector('.selector', options);
    
```

###Cancel
Returned promise has `.cancel()` method that can be used to reject the promise if you don't need the result anymore.
```
var lookUpPromise = dom.querySelector('.selector');
... 
if(dontNeedResult){
  lookUpPromise.cancel();
}
    
```