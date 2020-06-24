'use strict';

(function () {
  window.form = {
    capacityCheck: function (capacity, roomNumber) {
      if (roomNumber.value === '100' && capacity.value !== '0') {
        capacity.setCustomValidity('Не для гостей');
      } else if (capacity.value === '0' && roomNumber.value !== '100') {
        roomNumber.setCustomValidity('Выберите 100 комнат');
      } else if (roomNumber.value < capacity.value) {
        capacity.setCustomValidity('Не больше ' + roomNumber.value + ' гостей');
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    }
  };
})();
