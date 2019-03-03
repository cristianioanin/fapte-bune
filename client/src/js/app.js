fb.MainApplication = function () {
    this.initComponent();
};

fb.MainApplication.prototype = {
    initComponent: function () {
        this.attachListeners();
        this.initMap();
        this.getNGOs();
        this.getCauses();
    },

    attachListeners: function () {
        $('.card').on('mouseover', function (e) {
            $(e.currentTarget).find('.invisible').removeClass('invisible').addClass('visible');
        });
        $('.card').on('mouseout', function (e) {
            $(e.currentTarget).find('.visible').removeClass('visible').addClass('invisible');
        });
        $('.case-type').on('click', function (e) {
            $(e.currentTarget).siblings().removeClass('is-selected');
            $(e.currentTarget).removeClass('is-selected').addClass('is-selected');
        });
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
    getCauses: function () {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: `${fb.API}/causes`,
            success: $.proxy(this.loadCauses, this)
        });
    },
    initMap: function () {
        var myLatLng = {lat: 45.2222, lng: 25.0974};

        // Create a map object and specify the DOM element
        // for display.
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 6,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#212121"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#212121"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#181818"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1b1b1b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#2c2c2c"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8a8a8a"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#373737"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3c3c3c"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#4e4e4e"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3d3d3d"
                        }
                    ]
                }
            ]

        });
    },
    loadNGOs: function (ngos) {
        ngos.map(ngo => {
            const marker = new google.maps.Marker({
                map: this.map,
                position: {lat: ngo.lat, lng: ngo.lng},
                title: ngo.name,
                icon: {
                    url: "src/style/img/donate-icon-png.jpg",
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
        console.log(causes);
    }

};

$(document).ready(function () {
    app = new fb.MainApplication();
});