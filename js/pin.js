'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var getAfterHeight = function (elem) {
    var afterElem = window.getComputedStyle(elem, ':after');
    return Number(afterElem.height.split('px', 1));
  };

  var getPinSize = function (elem) {
    return {
      width: elem.getBoundingClientRect().width,
      centerX: elem.getBoundingClientRect().width / 2,
      height: elem.getBoundingClientRect().height + getAfterHeight(elem)
    };
  };

  var createPin = function (adv) {
    var pin = similarPinTemplate.cloneNode(true);
    var img = pin.querySelector('img');
    pin.style.left = adv.location.x + img.getAttribute('width') / 2 + 'px';
    pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
    img.src = adv.author.avatar;
    img.alt = adv.offer.title;
    return pin;
  };

  var findAdvPins = function () {
    return window.elements.mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var removeNodes = function (collection) {
    Array.from(collection).forEach(function (node) {
      node.remove();
    });
  };

  var updatePins = function () {
    var advPins = findAdvPins();
    removeNodes(advPins);
    var pinsForRender = window.data.pins;
    var filteredPins;
    if (window.elements.housingType.value === 'any') {
      filteredPins = pinsForRender;
    } else {
      filteredPins = pinsForRender.filter(function (elem) {
        return elem.offer.type === window.elements.housingType.value;
      });
    }
    renderPins(filteredPins);
  };

  window.elements.mapFilter.addEventListener('change', updatePins);

  var renderPins = function (pins) {
    var fragmentPins = document.createDocumentFragment();
    pins.forEach(function (adv) {
      fragmentPins.appendChild(createPin(adv));
    });
    window.elements.mapPinsContainer.appendChild(fragmentPins);
  };

  window.pin = {
    getPinSize: getPinSize,
    renderPins: renderPins,
    findAdvPins: findAdvPins
  };
})();
