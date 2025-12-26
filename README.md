# Desafio Técnico Backend - Linkio Dental

Este repositório contém a solução para o desafio técnico de backend para a vaga de desenvolvedor júnior na Linkio Dental. O objetivo é avaliar a organização de código, domínio de TypeScript e implementação de regras de negócio utilizando Node.js, Express e Mongoose.

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **TypeScript**
- **Mongoose** (MongoDB)
- **Vitest** (Testes Unitários)
- **Zod** (Validação de Dados)
- **JWT** (Autenticação)

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (Versão LTS recomendada)
- **PNPM** (Gerenciador de pacotes utilizado)
- **MongoDB** (Banco de dados rodando localmente ou URL de conexão)

## 🔧 Instalação e Configuração

1. **Clone o repositório:**

```bash
git clone https://github.com/vinybergamo/api-orders
cd api-orders
```

2. **Instale as dependências:**

```bash
pnpm install
```

3. **Configuração das Variáveis de Ambiente:**

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis (baseado em `src/config/env.ts`):

```env
PORT=3333
MONGO_URL=mongodb://localhost:27017/linkio-order-db
JWT_SECRET=supersecretkey123
```

- `PORT`: Porta onde o servidor irá rodar.
- `MONGO_URL`: String de conexão com o MongoDB.
- `JWT_SECRET`: Segredo para assinatura dos tokens JWT.

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento (com hot-reload):

```bash
pnpm dev
```

O servidor estará rodando em `http://localhost:3333`.

### Produção

Para gerar o build e iniciar em produção:

```bash
pnpm build
pnpm start
```

## 🧪 Testes

O projeto utiliza **Vitest** para garantir a qualidade do código e regras de negócio.

Para executar os testes:

```bash
pnpm test
```

Para rodar em modo watch:

```bash
pnpm test:watch
```

## 🛣️ Funcionalidades e API

### 1. Autenticação (Etapa 1)

- Registro e Login de usuários retornando token JWT.
- Rotas de pedidos protegidas por middleware de autenticação.

### 2. Gestão de Pedidos (Etapa 1 & 2)

- **POST /orders**: Criação de pedidos. Valida a presença de serviços e valor total > 0.
- **GET /orders**: Listagem com paginação e filtro por estado (`state`).

### 3. Regras de Negócio e Fluxo (Etapa 2)

- Transição de estados estrita via `PATCH /orders/:id/advance`.
- Fluxo Obrigatório: `CREATED` ➡️ `ANALYSIS` ➡️ `COMPLETED`.
- Bloqueio de tentativas de pular etapas ou retroceder.

## 📂 Estrutura de Pastas

```
src/
├── config/         # Configurações de DB e Env
├── middlewares/    # Middlewares (Auth, Error Handler)
├── models/         # Modelos Mongoose
├── modules/        # Módulos da aplicação (Controller, Service, Routes)
├── schemas/        # Schemas de validação Zod
├── tests/          # Testes automatizados
├── utils/          # Utilitários e Helpers
└── server.ts       # Ponto de entrada
```

---

**Desenvolvido como parte do processo seletivo Linkio Dental.**
