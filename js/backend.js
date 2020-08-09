'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var MAX__EXPECTATION = 10000;

  var Code = {
    SUCCSESS: 200,
    NOT_FOUND_ERROR: 404
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = MAX__EXPECTATION;

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCSESS) {
        onSuccess(xhr.response);
      } else {
        onError('Server answer: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        onError('Connection failed');
      });
      xhr.addEventListener('timeout', function () {
        onError('No answer for ' + xhr.timeout + 'ms');
      });
    });

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
