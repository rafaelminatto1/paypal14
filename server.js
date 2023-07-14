const express = require('express');
const app = express();
const paypal = require("@paypal/checkout-server-sdk");

app.get('/thankyou.html', (req, res) => {
  const transactionId = req.query.transaction_id;
  res.send(`<h1>Obrigado por sua compra!</h1><p>ID da transação: ${transactionId}</p>`);
});

app.use(express.static('./'));

app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});