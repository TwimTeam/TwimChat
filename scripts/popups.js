$.noty.defaults = {
    layout: 'topCenter',
    theme: 'relax',
    dismissQueue: true,
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
        close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: 2000,
    force: false,
    modal: false,
    maxVisible: 3,
    killer: false,
    closeWith: ['click'],
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onCloseClick: function() {}
    },
    buttons: false
};

function showAlertPopUp(text) {
    noty({
        text: text,
        type: 'alert'
    })
}

function showSuccessPopUp(text) {
    noty({
        text: text,
        type: 'success'
    })
}

function showErrorPopUp(text) {
    noty({
        text: text,
        type: 'error'
    })
}

function showInformationPopUp(text) {
    noty({
        text: text,
        type: 'information'
    })
}

function showConfirmPopUp(text) {
    noty({
        text: text,
        type: 'confirm'
    })
}