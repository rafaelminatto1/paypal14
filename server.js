const express = require('express');
const axios = require('axios');
const paypal = require("@paypal/checkout-server-sdk");
const app = express();

// Configure as informações de autenticação do PayPal
const clientId = 'AQkAi_i8fD3X9vdHjHJh7atGleTktPSboQISmvEMdwWk6-2h3rYm1mdWFzi385Ijx89DJLzD2DWvxyrR';
const secret = 'SAQkAi_i8fD3X9vdHjHJh7atGleTktPSboQISmvEMdwWk6-2h3rYm1mdWFzi385Ijx89DJLzD2DWvxyrR';
const accessTokenEndpoint = 'https://api.paypal.com/v1/oauth2/token';

let accessToken = '';

// Route to authenticate and obtain PayPal API access token
app.get('/authenticate', async (req, res) => {
  try {
    const response = await axios.post('https://api.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
      auth: {
        username: clientId,
        password: clientSecret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
    res.send('Authentication successful. Access token obtained.');
  } catch (error) {
    console.error('Error authenticating with PayPal:', error.message);
    res.status(500).send('Error authenticating with PayPal.');
  }
});

// Route to create a transaction and return the transaction ID
app.get('/create-transaction', async (req, res) => {
  try {
    const buyerName = req.query.buyerName;
    const buyerEmail = req.query.buyerEmail;
    const buyerPhone = req.query.buyerPhone;
    const buyerAddressLine1 = req.query.buyerAddressLine1;
    const buyerAddressLine2 = req.query.buyerAddressLine2;
    const buyerState = req.query.buyerState;
    const buyerPostalCode = req.query.buyerPostalCode;
    const buyerCountry = req.query.buyerCountry;

    const response = await axios.post('https://api.paypal.com/v2/checkout/orders', {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'BRL',
          value: '99.99'
        },
        shipping: {
          name: {
            full_name: buyerName
          },
          address: {
            address_line_1: buyerAddressLine1,
            address_line_2: buyerAddressLine2,
            admin_area_1: buyerState,
            postal_code: buyerPostalCode,
            country_code: buyerCountry
          }
        },
        payer: {
          name: {
            given_name: buyerName
          },
          email_address: buyerEmail,
          phone: {
            phone_number: {
              national_number: buyerPhone
            }
          },
          address: {
            address_line_1: buyerAddressLine1,
            address_line_2: buyerAddressLine2,
            admin_area_1: buyerState,
            postal_code: buyerPostalCode,
            country_code: buyerCountry
          }
        }
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const orderId = response.data.id;
    res.send(`Transaction created. Transaction ID: ${orderId}`);
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    res.status(500).send('Error creating transaction.');
  }
});

app.use(express.static('./'));

app.listen(3000, () => {
  console.log('Servidor iniciado em na porta   3000');
});