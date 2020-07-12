'use strict';

(function () {
  var setDisableForms = function (item, status) {
    Array.prototype.forEach.call(item.children, function (element) {
      element.disabled = status;
    });
  };

  var removeFirstChild = function (container) {
    while (container.firstElementChild) {
      container.firstElementChild.remove();
    }
  };
  window.util = {
    setDisableForms: setDisableForms,
    removeFirstChild: removeFirstChild
  };
})();
