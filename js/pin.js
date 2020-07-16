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

  var renderPin = function (adv) {
    var pin = similarPinTemplate.cloneNode(true);
    var img = pin.querySelector('img');
    pin.style.left = adv.location.x + img.getAttribute('width') / 2 + 'px';
    pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
    img.src = adv.author.avatar;
    img.alt = adv.offer.title;
    return pin;
  };

  var renderPins = function () {
    var fragmentPins = document.createDocumentFragment();
    window.data.pins.forEach(function (adv) {
      fragmentPins.appendChild(renderPin(adv));
    });
    window.elements.mapPinsContainer.appendChild(fragmentPins);
  };

  window.pin = {
    getPinSize: getPinSize,
    renderPins: renderPins
  };
})();
