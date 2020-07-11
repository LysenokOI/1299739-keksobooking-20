'use strict';

(function () {
  var activationForms = [window.elements.mapFilter, window.elements.adForm];
  activationForms.forEach(function (element) {
    window.util.setDisableForms(element, true);
  });

  var onActivatePage = function (evt) {
    evt.stopPropagation();
    if (window.elements.map.classList.contains('map--faded')) {
      window.elements.map.classList.remove('map--faded');
      window.elements.adForm.classList.remove('ad-form--disabled');
      window.pin.renderPins();
      activationForms.forEach(function (element) {
        window.util.setDisableForms(element, false);
      });
      window.backend.load(
          function (response) {
            window.data.pins = response;
            window.pin.renderPins();
          }, function (error) {
            var node = document.createElement('div');
            node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
            node.style.position = 'absolute';
            node.style.left = 0;
            node.style.right = 0;
            node.style.fontSize = '30px';
            node.textContent = error;
            document.body.insertAdjacentElement('afterbegin', node);
          }
      );
    }
  };

  window.elements.mapPinMain.addEventListener('click', onActivatePage);

})();
