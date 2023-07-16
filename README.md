# paypal14

# PayPal Integration

Este é um projeto de integração básica com o PayPal para simular um carrinho de compras em uma loja virtual. O projeto utiliza HTML, JavaScript e Node.js para criar uma página da web simples onde os usuários podem preencher as informações do comprador e iniciar um processo de pagamento via PayPal.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em seu computador antes de prosseguir.

## Instalação

1. Clone o repositório:
   ```shell
   git clone https://github.com/rafaelminatto1/paypal14.git

Instale as dependências:


npm install

## Configuração
Crie uma conta no PayPal Developer e obtenha as credenciais do cliente do Sandbox.

Abra o arquivo index.html e substitua 'client ID' pelo seu Client ID do Sandbox nas URLs dos scripts do PayPal.

## Executando o projeto
Inicie o servidor:
 
node server.js
Abra um navegador e acesse http://localhost:3000.

Testando a integração
Preencha o formulário com as informações do comprador.

Clique no botão "Pagar com PayPal".

Será redirecionado para a página de checkout do PayPal Sandbox.

Use as credenciais de teste fornecidas pelo PayPal para simular um pagamento.

Após a conclusão do pagamento, você será redirecionado para uma página de agradecimento exibindo o ID da transação.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request para melhorias no projeto.
