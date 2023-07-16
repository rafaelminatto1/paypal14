  // validate zip
  function isUSAZipCode(str) 
  {
    return /^\d{5}(-\d{4})?$/.test(str);
  }
  
  function validateInput() 
  {
    console.log("validateInput");
    let buyerPostalCode = document.getElementById("buyerPostalCode").value;
    let message = "";
    if (isUSAZipCode(buyerPostalCode)) 
    {
      message = "Valid Zip Code";
    } else {
      message = "Invalid Zip Code";
    }
    document.getElementById("msg").innerHTML = message;
  }

//paypal button
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



