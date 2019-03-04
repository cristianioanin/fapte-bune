fb.MainApplication = function () {
    this.initComponent();
};

fb.MainApplication.prototype = {
    initComponent: function () {
        this.attachListeners();
        this.initMap();
        this.getNGOs();
        this.getCauses({
            limit: 5
        });
    },

    attachListeners: function () {
        $('.cases-container').on('mouseover', '.card', function (e) {
            $(e.currentTarget).find('.d-none').removeClass('d-none').addClass('visible');
        });
        $('.cases-container').on('mouseout', '.card', function (e) {
            $(e.currentTarget).find('.visible').removeClass('visible').addClass('d-none');
        });
        $('.case-type').on('click', $.proxy(function (e) {
            const currentTarget = $(e.currentTarget);
            const type = currentTarget.data('type');
            currentTarget.siblings().removeClass('is-selected');
            currentTarget.removeClass('is-selected').addClass('is-selected');
            this.getCauses({
                limit: 5,
                type
            });
        }, this));

        $('.cases-container').on('click', '.btn-donate', $.proxy(this.onDonateClick, this));
    },
    getNGOs: function () {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: `${fb.API}/ngos`,
            success: $.proxy(this.loadNGOs, this)
        });
    },
    getCauses: function ({
        limit = null,
        type = null
    }) {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: `${fb.API}/causes?${limit ? `limit=${limit}` : ''}${type ? `&type=${type}` : ''}`,
            success: $.proxy(this.loadCauses, this)
        });
    },
    initMap: function () {
        var myLatLng = {
            lat: 45.2222,
            lng: 25.0974
        };

        // Create a map object and specify the DOM element
        // for display.
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 6

        });
    },
    loadNGOs: function (ngos) {
        ngos.map(ngo => {
            const marker = new google.maps.Marker({
                map: this.map,
                position: {
                    lat: ngo.lat,
                    lng: ngo.lng
                },
                title: ngo.name,
                icon: {
                    url: "src/style/images/donate-icon-png.jpg",
                    scaledSize: new google.maps.Size(32, 32)
                }
            });
            if (ngo.logo) {
                const infowindow = new google.maps.InfoWindow({
                    content: `<div><div><img src=${ngo.logo} /></div></div>`
                });
                marker.addListener('click', function () {
                    infowindow.open(this.map, marker);
                });
            }
        });
    },
    loadCauses: function (causes) {
        const row = $('<div class="row no-gutters">');
        const mainCardContainer = $('<div class="col col-6 card-container main-card-container"></div>');
        const secondaryCardsContainer = $('<div class="col col-6 card-container secondary-cards-container"></div>');
        const secondaryRow = $('<div class="row no-gutters h-100">');
        causes.map((cause, index) => {
            const card = $('<div class="card" data-id=' + cause._id + ' data-raised=' + cause.amountRaised + ' data-remaining=' + cause.needsToRaise + '>' +
                '<img class="card-img-top" src=' + cause.image + ' alt="Card">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + cause.name + '</h5>' +
                '<p class="card-text">' + cause.description + '</p>' +
                '<a href="#" class="btn btn-primary d-none btn-donate">Donate</a>' +
                '</div>' +
                '</div>');

            if (index === 0) {
                card.addClass('h-100');
                mainCardContainer.append(card);
            } else {
                card.addClass('col col-6');
                secondaryRow.append(card);
            }
        });
        secondaryCardsContainer.append(secondaryRow);
        row.append(mainCardContainer);
        row.append(secondaryCardsContainer);
        if (causes.length) {
            $('.cases-container').empty().append(row);
        } else {
            $('.cases-container').empty().append('<div class="alert alert-danger" role="alert">Momentan nu sunt cazuri active in aceasta categorie.</div>');
        }
    },
    onDonateClick: function (e) {
        const currentTarget = $(e.currentTarget);
        const parent = currentTarget.closest('.card');
        const causeId = parent.data('id');
        const amountRaised = parent.data('raised');
        const needsToRaise = parent.data('remaining');
        if (!$('#modal').length) {
            $('body').append('<div id="modal"></div>');
        } else {
            $('#modal').empty();
        }
        const window = $('#modal').kendoWindow({
            width: '700px',
            modal: true,
            height: '500px',
            visible: false,
            actions: [
                "Close"
            ],
            content: 'src/templates/DonateWindow.html',
            refresh: function (response) {
                const donate = new fb.windows.DonateWindow({
                    causeId,
                    amountRaised,
                    needsToRaise
                });
            }
        }).data('kendoWindow');
        window.center().open();
    }

};

$(document).ready(function () {
    app = new fb.MainApplication();
});