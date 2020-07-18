'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adAddressInput = adForm.querySelector('#address');
  var titleInput = adForm.querySelector('#title');
  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var checkinInput = adForm.querySelector('#timein');
  var checkoutInput = adForm.querySelector('#timeout');
  var avatarInput = adForm.querySelector('#avatar');
  var photosInput = adForm.querySelector('#images');
  var mapPinsContainer = map.querySelector('.map__pins');
  var housingType = mapFilter.querySelector('#housing-type');

  window.elements = {
    map: map,
    mapFilter: mapFilter,
    adForm: adForm,
    mapPinMain: mapPinMain,
    adAddressInput: adAddressInput,
    titleInput: titleInput,
    typeInput: typeInput,
    priceInput: priceInput,
    roomNumberInput: roomNumberInput,
    capacityInput: capacityInput,
    checkinInput: checkinInput,
    checkoutInput: checkoutInput,
    avatarInput: avatarInput,
    photosInput: photosInput,
    mapPinsContainer: mapPinsContainer,
    housingType: housingType
  };
})();
