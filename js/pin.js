'use strict';

(function () {
  var COUNT_ADS = 8;

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

  var mapPinsContainer = window.elements.map.querySelector('.map__pins');

  var advList = [];
  var renderPins = function () {
    if (advList.length < COUNT_ADS) {
      var fragmentPins = document.createDocumentFragment();
      for (var i = 1; i <= COUNT_ADS; i++) {
        var adv = window.data.createAdv(i, window.elements.map);
        advList.push(adv);
        fragmentPins.appendChild(window.pin.renderPin(adv));
      }
      mapPinsContainer.appendChild(fragmentPins);
      mapPinsContainer.after(window.card.renderCard(advList[0]));
    }
  };

  window.pin = {
    getPinSize: getPinSize,
    renderPin: renderPin,
    renderPins: renderPins,
    advList: advList
  };
})();
