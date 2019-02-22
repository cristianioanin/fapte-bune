fb.MainApplication = function () {
    this.initComponent();
};

fb.MainApplication.prototype = {
    initComponent: function () {
        this.attachListeners();
    },

    attachListeners: function () {
        $('.card').on('mouseover', function (e) {
            $(e.currentTarget).find('.invisible').removeClass('invisible').addClass('visible');
        });
        $('.card').on('mouseout', function (e) {
            $(e.currentTarget).find('.visible').removeClass('visible').addClass('invisible');
        });
    }

};

function timestamp() {
    return new Date().getTime();
};

$(document).ready(function () {
    app = new fb.MainApplication();
});