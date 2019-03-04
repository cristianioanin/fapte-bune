fb.windows.DonateWindow = function (config) {
    $.extend(this, config);
    this.initComponent();
    this.attachListeners();
};

fb.windows.DonateWindow.prototype = {
    initComponent: function () {
        this.loadProgressData(this.amountRaised, this.needsToRaise);
    },
    attachListeners: function () {
        $('.exact-amount').on('click', function (e) {
            const currentTarget = $(e.currentTarget);
            $('.exact-amount-container').find('.is-selected').removeClass('is-selected');
            if (!currentTarget.hasClass('is-selected')) {
                currentTarget.addClass('is-selected');
            } else {
                currentTarget.removeClass('is-selected');
            }
        });

        $('.btn-confirm-donation').on('click', $.proxy(this.onConfirmDonationClick, this));
    },
    loadProgressData: function (amountRaised, needsToRanpm,ise) {
        const percentage = (amountRaised * 100) / needsToRaise;
        $('.progress-amount-raised').empty().append('<span>' + amountRaised + ' RON din ' + needsToRaise + ' </span>');
        $('.progress').empty().append('<div class="progress-bar" style="width: ' + percentage + '%" role="progressbar" aria-valuenow=' + percentage + ' aria-valuemin="0" aria-valuemax=' + needsToRaise + '></div>');
    },
    onConfirmDonationClick: function (e) {
        const selectedSumEl = $('.exact-amount-container').find('.is-selected');
        const sum = selectedSumEl.length ? parseInt(selectedSumEl.data('sum')) : parseInt($('#custom-amount').val());
        if (sum) {
            const amountRaised = this.amountRaised + sum;
            const data = {amountRaised};
            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                url: `${fb.API}/causes/${this.causeId}`,
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (response) {
                    console.log(response);
                    $('.confirm-container').empty().append('<div class="alert alert-success" role="alert">Felicitari. Esti un super erou!</div>');
                    this.loadProgressData(this.amountRaised + response.amountRaised, this.needsToRaise);
                }
            });
        }
    }
};