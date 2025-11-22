# Petshop - Sistema de Gerenciamento

Sistema completo de gerenciamento para petshop com backend em NestJS e frontend em Next.js.

## Estrutura do Projeto

```
petshop/
├── backend/              # API NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── pessoa/
│   │   │   ├── cliente/
│   │   │   ├── funcionario/
│   │   │   ├── animal/
│   │   │   ├── servico/
│   │   │   ├── compra/
│   │   │   ├── fornecedor/
│   │   │   └── produto/
│   │   └── app.module.ts
│   └── Dockerfile
├── frontend/             # Interface Next.js
│   ├── app/
│   └── Dockerfile
└── docker-compose.yml
```

## Tecnologias

- **Backend:** NestJS + TypeScript + PostgreSQL
- **Frontend:** Next.js 16 + React 19 + TailwindCSS
- **Database:** PostgreSQL 16
- **Containerização:** Docker + Docker Compose

## Início Rápido

### Executar todos os serviços com Docker

```bash
# Rodar frontend e backend juntos
docker compose --profile full up --build

# Rodar apenas backend
docker compose --profile backend up

# Rodar apenas frontend
docker compose --profile frontend up

# Rodar em background
docker compose --profile full up -d
```

### Serviços Disponíveis

- **Frontend:** http://localhost:4000
- **Backend API:** http://localhost:3000
- **PostgreSQL:** localhost:5432
- **Adminer (DB Admin):** http://localhost:8080

## Desenvolvimento Local

### Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Módulos Disponíveis

- `/pessoa` - Gerenciamento de pessoas
- `/cliente` - Gerenciamento de clientes
- `/funcionario` - Gerenciamento de funcionários
- `/animal` - Gerenciamento de animais
- `/servico` - Gerenciamento de serviços
- `/compra` - Gerenciamento de compras
- `/fornecedor` - Gerenciamento de fornecedores
- `/produto` - Gerenciamento de produtos

Cada módulo suporta operações CRUD:
- `GET /modulo` - Listar todos
- `GET /modulo/:id` - Buscar por ID
- `POST /modulo` - Criar novo
- `PUT /modulo/:id` - Atualizar
- `DELETE /modulo/:id` - Remover

## Comandos Docker Úteis

```bash
# Parar todos os containers
docker compose down

# Ver logs
docker compose logs -f

# Rebuild sem cache
docker compose build --no-cache

# Limpar volumes
docker compose down -v
```

## Variáveis de Ambiente

As variáveis de ambiente estão no arquivo `.env`:

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=petshop
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```
