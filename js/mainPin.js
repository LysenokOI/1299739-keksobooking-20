'use strict';

(function () {

  window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };


        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var pinMouseCoords = function () {
          return {
            x: window.elements.mapPinMain.offsetLeft - shift.x,
            y: window.elements.mapPinMain.offsetTop - shift.y
          };
        };

        var checkPinCoords = function () {
          if (pinMouseCoords().y < window.data.MAP_SIZE_VERT.min) {
            window.elements.mapPinMain.style.top = window.data.MAP_SIZE_VERT.min + 'px';
          }
          var lowerMapBoundery = window.data.MAP_SIZE_VERT.max - window.form.mainPinSize.height;
          if (pinMouseCoords().y > lowerMapBoundery) {
            window.elements.mapPinMain.style.top = lowerMapBoundery + 'px';

          }
          if (pinMouseCoords().x < -window.form.mainPinSize.centerX) {
            window.elements.mapPinMain.style.left = -window.form.mainPinSize.centerX + 'px';
          }
          var mapRightBoundery = window.elements.map.offsetWidth - window.form.mainPinSize.centerX;
          if (pinMouseCoords().x > mapRightBoundery) {
            window.elements.mapPinMain.style.left = mapRightBoundery + 'px';
          }
        };

        checkPinCoords();

        window.elements.mapPinMain.style.left = pinMouseCoords().x + 'px';
        window.elements.mapPinMain.style.top = pinMouseCoords().y + 'px';

        window.form.mainPinCoords = {
          x: window.elements.mapPinMain.offsetLeft + Math.round(window.form.mainPinSize.centerX),
          y: window.elements.mapPinMain.offsetTop + window.form.mainPinSize.height
        };

        window.form.setAddressInputValue(window.elements.adAddressInput, window.form.mainPinCoords);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.elements.map.removeEventListener('mousemove', onMouseMove);
        window.elements.map.removeEventListener('mouseup', onMouseUp);
      };

      window.elements.map.addEventListener('mousemove', onMouseMove);
      window.elements.map.addEventListener('mouseup', onMouseUp);
    }
  });
})();
