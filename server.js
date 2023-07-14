const express = require('express');
const axios = require('axios');
const paypal = require("@paypal/checkout-server-sdk");
const app = express();

// Configure as informações de autenticação do PayPal
const clientId = 'AQkAi_i8fD3X9vdHjHJh7atGleTktPSboQISmvEMdwWk6-2h3rYm1mdWFzi385Ijx89DJLzD2DWvxyrR';
const secret = 'SAQkAi_i8fD3X9vdHjHJh7atGleTktPSboQISmvEMdwWk6-2h3rYm1mdWFzi385Ijx89DJLzD2DWvxyrR';
const accessTokenEndpoint = 'https://api.paypal.com/v1/oauth2/token';

let accessToken = '';

// Rota para autenticar e obter o token de acesso do PayPal API
app.get('/authenticate', async (req, res) => {
  try {
    const response = await axios.post('https://api.paypal.com/v1/oauth2/token', {
      grant_type: 'client_credentials'
    }, {
      auth: {
        username: clientId,
        password: clientSecret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
    res.send('Autenticação bem-sucedida. Token de acesso obtido.');
  } catch (error) {
    console.error('Erro ao autenticar com o PayPal:', error.message);
    res.status(500).send('Erro ao autenticar com o PayPal.');
  }
});

// Rota para criar uma transação e retornar o ID da transação
app.get('/create-transaction', async (req, res) => {
  try {
    const response = await axios.post('https://api.paypal.com/v2/checkout/orders', {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '99.99'
        }
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const orderId = response.data.id;
    res.send(`Transação criada. ID da transação: ${orderId}`);
  } catch (error) {
    console.error('Erro ao criar a transação:', error.message);
    res.status(500).send('Erro ao criar a transação.');
  }
});

app.use(express.static('./'));

app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});