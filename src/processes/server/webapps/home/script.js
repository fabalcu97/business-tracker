function saveBusiness () {
  $('#loader').text("Cargando...");
  navigator.geolocation.getCurrentPosition((resp) => {
    let formData = {
      name: $('#name').val(),
      address: $('#address').val(),
      contactName: $('#contact-name').val(),
      contactNumber: Number($('#contact-number').val()),
      commentary: $('#commentary').val(),
      deviceType: $('#device').val(),
      latitude: resp.coords.latitude,
      longitude: resp.coords.longitude,
      timestamp: resp.timestamp,
    };
    $.post('api/business', formData, (data, status) => {
      if (status == 'error') {
        console.error("Error =>", data);
        alert("Error");
        return;
      }
      console.log("D =>", data);
      $('#loader').text("Éxito");
    });
  }, (err) => {
    alert("Error getting coordinates");
    $('#loader').text("Error");
  })
}