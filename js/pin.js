'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  window.pin = {
    renderPin: function (adv) {
      var pin = similarPinTemplate.cloneNode(true);
      var img = pin.querySelector('img');
      pin.style.left = adv.location.x + img.getAttribute('width') / 2 + 'px';
      pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
      img.src = adv.author.avatar;
      img.alt = adv.offer.title;
      return pin;
    }
  };
})();
