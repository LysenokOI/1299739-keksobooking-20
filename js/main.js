'use strict';

(function() {
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  var onActivatePage = function (e) {
    e.stopPropagation();
    if (mapElement.classList.contains('map--faded')) {
      window.backend.load(onSuccess, onError);
      window.form.enableAdForm();
      window.form.preValidateForm();
    }
    window.move.onMoveListener(e);
  };

  var onSuccess = function(response) {
    mapElement.classList.remove('map--faded');
    window.data.filtered = window.data.pins = response;
    window.pin.renderPins(window.data.filtered.slice(0, 5));
    window.form.enableFilterForm();
  };

  var onError = function(error) {
    window.dialog.openErrorDialog(error);
  };

  mainPinElement.addEventListener('mousedown', onActivatePage);
  window.form.disableForms();
  window.form.setAddress(mainPinElement.offsetLeft, mainPinElement.offsetTop);
})();
