var client_location,
    client_latitude,
    client_longtitude,
    myLatLng;

$.get("http://ipinfo.io", function(response) {
    client_location = response.loc;
    client_latitude = client_location.slice(0, 7);
    client_longtitude = client_location.substr(client_location.length - 7);
    if(client_longtitude > 0) {
      initMap();
    }
}, "jsonp");





function initMap() {
  myLatLng = {lat: parseFloat(client_latitude), lng: parseFloat(client_longtitude)};
  var customMapType = new google.maps.StyledMapType([
    {
      featureType: 'landscape.natural',
      styles: [{color: '#4CAF50'}]
    },
    {
      elementType: 'labels',
      stylers: [{visibility: 'on'}]
    },
    {
      featureType: 'landscape',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'water',
      stylers: [{color: '#2196F3'}]
    }
    ], {
    name: 'Custom Style'
  });

  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });



  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}
