'use strict';

(function () {
  window.util = {
    setDisableForms: function (item, status) {
      Array.prototype.forEach.call(item.children, function (element) {
        element.disabled = status;
      });
    }
  };
})();
