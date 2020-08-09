'use strict';

(function () {

  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (adv) {
    card.querySelector('.popup__title').textContent = adv.offer.title;
    card.querySelector('.popup__text--address').textContent = adv.offer.address;
    card.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = adv.offer.title;
    card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests;
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    card.querySelector('.popup__description').textContent = adv.offer.description;
    card.querySelector('.popup__avatar').src = adv.author.avatar;

    var cardFeatures = card.querySelector('.popup__features');
    var fragmentFeatures = document.createDocumentFragment();

    for (var i = 0; i < adv.offer.features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
      featureElement.textContent = adv.offer.features[i];
      fragmentFeatures.append(featureElement);
    }

    window.util.removeFirstChild(cardFeatures);
    cardFeatures.append(fragmentFeatures);

    var photos = card.querySelector('.popup__photos');
    if (adv.offer.photos.length === 0) {
      photos.style.display = 'none';
    } else {
      var fragmentPhotos = document.createDocumentFragment();
      for (var j = 0; j < adv.offer.photos.length; j++) {
        var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = adv.offer.photos[j];
        fragmentPhotos.appendChild(photoElement);
      }
      window.util.removeFirstChild(photos);
      photos.style.display = 'flex';
      photos.appendChild(fragmentPhotos);
    }
    window.elements.mapPinsContainer.after(card);
  };

  var pinHandler = function (evt) {
    var advPins = window.pin.findAdvPins();
    var target = null;
    if (evt.target.classList.value === 'map__pin') {
      target = evt.target;
    } else if (evt.target.parentElement.classList.value === 'map__pin') {
      target = evt.target.parentElement;
    }
    if (target) {
      renderCard(window.data.pins[Array.from(advPins).indexOf(target)]);
    }
    window.elements.map.addEventListener('click', onCardClick);
    document.addEventListener('keydown', onCardPress);
  };

  var cardRemove = function () {
    var mapCard = window.elements.map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var onCardClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      cardRemove();
      document.removeEventListener('click', onCardClick);
    }
  };

  var onCardPress = function (evt) {
    if (evt.keyCode === 27) {
      cardRemove();
      document.removeEventListener('keydown', onCardPress);
    }
  };

  window.elements.map.addEventListener('click', pinHandler);
  window.elements.mapFilter.addEventListener('change', cardRemove);

  window.card = {
    pinHandler: pinHandler
  };
})();
