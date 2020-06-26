'use strict';
var COUNT_ADS = 8;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');


var advList = [];
var renderPins = function () {
  if (advList.length < COUNT_ADS) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 1; i <= COUNT_ADS; i++) {
      var adv = window.data.createAdv(i, map);
      advList.push(adv);
      fragmentPins.appendChild(window.pin.renderPin(adv));
    }
    mapPins.appendChild(fragmentPins);
    mapPins.after(window.card.renderCard(advList[0]));
  }
};

var mapFilter = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var activationForms = [mapFilter, adForm];


var setPageStatus = function (status) {
  if (status) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPins();
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

var mapPinMain = map.querySelector('.map__pin--main');

var mainPinSize = window.pinSize.getPinSize(mapPinMain);

var mainPinCoords = {
  x: Math.round(mapPinMain.offsetLeft + mainPinSize.centerX),
  y: Math.round(mapPinMain.offsetTop + mainPinSize.centerX)
};

var adAddressInput = adForm.querySelector('#address');
var setAddressInputValue = function (coords) {
  adAddressInput.value = coords.x + ', ' + coords.y;
};

setAddressInputValue(mainPinCoords);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setPageStatus(true);
  }
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();

    setPageStatus(true);

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
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };
      };

      var checkPinCoords = function () {
        if (pinMouseCoords().y < window.mapSize.MAP_SIZE_VERT.min) {
          mapPinMain.style.top = window.mapSize.MAP_SIZE_VERT.min + 'px';
        }
        var lowerMapBoundery = window.mapSize.MAP_SIZE_VERT.max - mainPinSize.height;
        if (pinMouseCoords().y > lowerMapBoundery) {
          mapPinMain.style.top = lowerMapBoundery + 'px';

        }
        if (pinMouseCoords().x < -mainPinSize.centerX) {
          mapPinMain.style.left = -mainPinSize.centerX + 'px';
        }
        var mapRightBoundery = window.mapSize.mapEndX - mainPinSize.centerX;
        if (pinMouseCoords().x > mapRightBoundery) {
          mapPinMain.style.left = mapRightBoundery + 'px';
        }
      };

      checkPinCoords();

      mapPinMain.style.left = pinMouseCoords().x + 'px';
      mapPinMain.style.top = pinMouseCoords().y + 'px';

      mainPinCoords = {
        x: mapPinMain.offsetLeft + Math.round(mainPinSize.centerX),
        y: mapPinMain.offsetTop + mainPinSize.height
      };

      setAddressInputValue(mainPinCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
});


adForm.action = 'https://javascript.pages.academy/keksobooking';
var titleInput = adForm.querySelector('#title');
/*titleInput.required = true;
titleInput.minLength = 30;
titleInput.maxLength = 100;
*/
var roomNumberInput = adForm.querySelector('#room_number');

var capacityInput = adForm.querySelector('#capacity');

var roomCheck = window.form.capacityCheck(capacityInput, roomNumberInput);
roomNumberInput.addEventListener('change', roomCheck);
capacityInput.addEventListener('change', roomCheck);
