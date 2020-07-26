'use strict';

(function() {
  var errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var errorDialog = errorTemplate.cloneNode(true);
  var successDialog = successTemplate.cloneNode(true);
  var errorDialogBtn = errorDialog.querySelector('.error__button');
  var mainContainer = document.querySelector('main');

  var openErrorDialog = function (error) {
    errorDialog.querySelector('.error__message').textContent = error;
    mainContainer.appendChild(errorDialog);
    errorDialogBtn.addEventListener('click', closeErrorDialog);
    errorDialog.addEventListener('click', closeErrorDialogByClick);
    document.addEventListener('keydown', closeErrorDialogByEsc);
  };

  var closeErrorDialog = function (e) {
    errorDialog.remove();
    errorDialogBtn.removeEventListener('click', closeErrorDialog);
    errorDialog.removeEventListener('click', closeErrorDialogByClick);
    document.removeEventListener('keydown', closeErrorDialogByEsc);
  };

  var closeErrorDialogByClick = function (e) {
    if (e.target.classList.contains('error')) {
      closeErrorDialog(e);
    }
  };

  var closeErrorDialogByEsc = function (e) {
    if (e.key === 'Escape') {
      closeErrorDialog(e);
    }
  };

  var openSuccessDialog = function () {
    mainContainer.appendChild(successDialog);
    document.addEventListener('keydown', closeSuccessDialogByEsc);
    successDialog.addEventListener('click', closeSuccessDialogByClick);
  };

  var closeSuccessDialog = function () {
    successDialog.remove();
    document.removeEventListener('keydown', closeSuccessDialogByEsc);
    successDialog.removeEventListener('click', closeSuccessDialogByClick);
  };

  var closeSuccessDialogByClick = function (e) {
    if (e.target.classList.contains('success')) {
      closeSuccessDialog(e);
    }
  };

  var closeSuccessDialogByEsc = function (e) {
    if (e.key === 'Escape') {
      closeSuccessDialog(e);
    }
  };


  window.dialog = {
    openErrorDialog: openErrorDialog,
    openSuccessDialog: openSuccessDialog,
  };

})();
