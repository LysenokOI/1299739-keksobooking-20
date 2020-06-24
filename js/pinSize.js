'use strict';

(function () {
  var getAfterHeight = function (elem) {
    var afterElem = window.getComputedStyle(elem, ':after');
    return Number(afterElem.height.split('px', 1));
  };

  window.pinSize = {
    getPinSize: function (elem) {
      return {
        width: elem.getBoundingClientRect().width,
        centerX: elem.getBoundingClientRect().width / 2,
        height: elem.getBoundingClientRect().height + getAfterHeight(elem)
      };
    }
  };
})();
