# API de Transações:

## Visão Geral
Esta aplicação permite que os usuários gerenciem suas transações financeiras. Os usuários podem criar novas transações, listar todas as transações, visualizar detalhes de uma transação específica e obter um resumo de sua conta.

## Tecnologias Utilizadas:
- Node.js
- Fastify
- Knex
- SQLite
- TypeScript

## Configuração e Instalação:

### 1. Clone o Reposítório:
Clone o repositório da aplicação para o seu ambiente local:

```
  git clone <URL_DO_REPOSITORIO>
  cd <NOME_DO_REPOSITORIO>
```

### 2. Instale as Dependências:
Instale todas as dependências necessárias usando o npm:

```
  npm install
```

### 3. Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto baseado no arquivo .env.example fornecido. Preencha as variáveis de ambiente necessárias:

```
  DATABASE_URL=""
  DATABASE_CLIENT="sqlite"
  PORT=3333
```

### 4. Execute as Migrações do Banco de Dados:
Utilize o Knex para criar as tabelas no banco de dados:

```
  npm run knex -- migrate:latest
```

## Endpoints da API:

### Criar uma Nova Transação:
- URL: /transactions
- Método: POST
- Descrição: Cria uma nova transação.
- Corpo da Requisição:
```
{
  "amount": 100.00,
  "type": "credit",
  "description": "Depósito"
}
```
### Obter Resumo da Conta:
- URL: /account/summary
- Método: GET
- Descrição: Obtém um resumo da conta do usuário.
- Resposta:
```
{
  "amount": "100"
}
```
### Listar Todas as Transações:
- URL: /transactions
- Método: GET
- Descrição: Lista todas as transações do usuário.
- Resposta:
```
[
  {
    "id": "uuid",
    "amount": 100.00,
    "type": "credit",
    "description": "Depósito",
    "createdAt": "2024-07-05T12:00:00.000Z"
  },
  {
    "id": "uuid",
    "amount": 50.00,
    "type": "debit",
    "description": "Compra",
    "createdAt": "2024-07-04T12:00:00.000Z"
  }
]
```
### Visualizar uma Transação Única:
- URL: /transactions/:id
- Método: GET
- Descrição: Visualiza uma transação específica.
- Parâmetros: id (string): Identificador único da transação.
