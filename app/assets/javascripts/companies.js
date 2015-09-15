$(document).on('ready page:load', function() {
  //Google Maps API
  var placeSearch;
  var autocomplete = {};
  var autocompleteWraps = [];
  var extraFieldsCount = document.querySelectorAll('[id^="cities"]').length;
  for (var i = 0; i < extraFieldsCount; i++) {
    eval('autocompleteWraps'+'['+i+']'+'='+ "'cities'+i");
  }
  console.log(extraFieldsCount);
  console.log(autocompleteWraps);

  var componentForm = {
    sublocality_level_1: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name'
  };

  function initAutocomplete() {
    $.each(autocompleteWraps, function(index, name) {
      autocomplete[name] = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById(name)),
        {types: ['geocode']});
      autocomplete[name].addListener('place_changed', fillInAddress);

      function fillInAddress() {
        var place = autocomplete[name].getPlace();
        var locationArray = [];
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          switch (addressType) {
            case "sublocality_level_1":
              val = place.address_components[i][componentForm[addressType]];
              break;
            case "locality":
              val = " " + place.address_components[i][componentForm[addressType]];
              break;
            case "administrative_area_level_1":
              val = " " + place.address_components[i][componentForm[addressType]];
              break;
            case "country":
              val = " " + place.address_components[i][componentForm[addressType]];
              break;
            default:
              val = "";
              break;
          }
          if (val.length === 0) {
            } else {
              locationArray.push(val);
            }
        }
        document.getElementById(name).value = locationArray.toString();
      }
    });

  }
  window.initAutocomplete = initAutocomplete;

  //-----------------------------------
  //Serve multiple cities slide toggle
  $("#serve-multiple-cities").click(function(){
    $("#multiple-cities-container").slideToggle("slow");
  });

  //----------------------------------
  //Countdown feature
  var descriptionInput = $('#company_description');
  var countdown = $('.countdown');
  var pageRequiresCountdown = (descriptionInput.length > 0) && (countdown.length > 0);

  if (pageRequiresCountdown) {
    function updateCountdown() {
      // 90 is the max message length
      var remaining = 90 - descriptionInput.val().length;
      countdown.text(remaining + ' characters remaining.');
    };
    updateCountdown();
    descriptionInput.change(updateCountdown);
    descriptionInput.keyup(updateCountdown);
  }
});
