'use strict';

(function() {
  var mapElement = document.querySelector('.map');
  var target = null;

  var onClickMap = function (e) {
    if (e.target.classList.contains('map__pin') &&
      !e.target.classList.contains('map__pin--main')) {
      target = e.target;
    } else if (e.target.parentElement.classList.contains('map__pin') &&
      !e.target.parentElement.classList.contains('map__pin--main')) {
      target = e.target.parentElement;
    } else {
      target = null;
    }

    if (target) {
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var index = [].slice.call(pinsCollection).indexOf(target);
      window.card.renderCard(window.data.filtered[index]);
      pinsCollection[index].classList.add('map__pin--active');
    }
  };
  mapElement.addEventListener('click', onClickMap);
})();
