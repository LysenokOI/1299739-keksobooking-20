'use strict';

(function () {
  var activationForms = [window.elements.mapFilter, window.elements.adForm];

  var setPageStatus = function (status) {
    if (status) {
      window.elements.map.classList.remove('map--faded');
      window.elements.adForm.classList.remove('ad-form--disabled');
      window.pin.renderPins();
      window.card.renderCard();
    }
    activationForms.forEach(function (element) {
      if (status) {
        window.util.setDisableForms(element, !status);
      } else {
        window.util.setDisableForms(element, !status);
      }
    });
  };

  setPageStatus(false);
  window.map = {
    setPageStatus: setPageStatus
  };
})();
