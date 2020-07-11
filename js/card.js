'use strict';

(function () {

  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var removeFirstChild = function (container) {
    while (container.firstElementChild) {
      container.firstElementChild.remove();
    }
  };
  var renderCard = function (adv) {
    card.querySelector('.popup__title').textContent = adv.offer.title;
    card.querySelector('.popup__text--address').textContent = adv.offer.address;
    card.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = window.data.appartList[adv.offer.type].title;
    card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests;
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    card.querySelector('.popup__description').textContent = adv.offer.description;
    card.querySelector('.popup__avatar').src = adv.author.avatar;

    var cardFeatures = card.querySelector('.popup__features');
    var fragmentFeatures = document.createDocumentFragment();

    for (var i = 0; i < adv.offer.features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
      featureElement.textContent = window.data.featuresList[i];
      fragmentFeatures.append(featureElement);
    }

    removeFirstChild(cardFeatures);
    cardFeatures.append(fragmentFeatures);

    var photos = card.querySelector('.popup__photos');
    var fragmentPhotos = document.createDocumentFragment();

    for (var j = 0; j < adv.offer.photos.length; j++) {
      var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = adv.offer.photos[j];
      fragmentPhotos.appendChild(photoElement);
    }
    removeFirstChild(photos);
    photos.appendChild(fragmentPhotos);

    window.elements.mapPinsContainer.after(card);
  };

  var getIndex = function (elem, list) {
    return [].slice.call(list).indexOf(elem);
  };

  var target = null;

  var pinHandler = function (evt) {
    var advPins = window.elements.mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (evt.target.classList.value === 'map__pin') {
      target = evt.target;
    }
    if (evt.target.parentElement.classList.value === 'map__pin') {
      target = evt.target.parentElement;
    }
    renderCard(window.pin.advList[[].slice.call(advPins).indexOf(target)]);
  };

  window.elements.mapPinsContainer.addEventListener('click', pinHandler);
/*
var cardHandler = function (evt) {
  var closeCardButton = window.elements.map.querySelector('.popup');
}
*/
  window.card = {
    //createCard: renderCard,
    pinHandler: pinHandler
  };
})();
