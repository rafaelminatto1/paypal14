paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '99.99'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      window.location.href = "thankyou.html?transaction_id=" + details.id;
    });
  }
}).render('#paypal-button-container');