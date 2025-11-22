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

### Configuração Inicial

Antes de executar o projeto, copie o arquivo de variáveis de ambiente:

```bash
# Copiar arquivo de exemplo para .env
cp .env_developer .env
```

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

Cada módulo suporta operações CRUD básicas:
- `GET /modulo` - Listar todos
- `GET /modulo/:id` - Buscar por ID
- `POST /modulo` - Criar novo
- `PUT /modulo/:id` - Atualizar
- `DELETE /modulo/:id` - Remover

### Endpoints de Consultas Especiais

#### Produto (`/produto`)
- `GET /produto/low-stock` - Lista produtos com estoque abaixo do mínimo
  - Retorna: ID, nome, categoria e fornecedor dos produtos
- `GET /produto/best-sellers` - Lista produtos mais vendidos
  - Retorna: Nome, categoria, preço e quantidade total vendida
  - Ordenado por quantidade vendida (DESC)

#### Serviço (`/servico`)
- `GET /servico/count` - Retorna o número total de serviços
  - Retorna: Número inteiro com a contagem
- `GET /servico/revenue-by-month?mes=MM&ano=YYYY` - Retorna o faturamento do mês
  - Parâmetros: mes (1-12) e ano (YYYY)
  - Retorna: Mês, ano, faturamento de serviços, faturamento de produtos, faturamento total e total de serviços realizados
  - O faturamento total inclui tanto o valor dos serviços quanto o valor dos produtos vendidos nos serviços
- `GET /servico/by-fornecedor/:nomeFornecedor` - Lista serviços por fornecedor
  - Retorna: Nome do fornecedor, produto, tipo de serviço e data/hora
- `GET /servico/by-date?dataEspecifica=YYYY-MM-DD` - Agenda diária de serviços
  - Retorna: Nome do funcionário, especialidade, tipo de serviço, data/hora, nome do animal e dono

#### Funcionário (`/funcionario`)
- `GET /funcionario/employee-of-the-month?mes=MM&ano=YYYY` - Retorna o funcionário destaque do mês
  - Parâmetros: mes (1-12) e ano (YYYY)
  - Retorna: Nome, CPF, especialidade e total de atendimentos realizados no mês
  - Funcionário com maior número de atendimentos no período especificado
- `GET /funcionario/with-service-count` - Lista funcionários com contagem de serviços
  - Retorna: Nome, especialidade e total de serviços realizados
  - Ordenado por total de serviços (DESC)

#### Compra (`/compra`)
- `GET /compra/by-date-range?dataInicio=YYYY-MM-DD&dataFinal=YYYY-MM-DD` - Compras por período
  - Retorna: ID da compra, cliente, data/hora, forma de pagamento, status e total de produtos
  - Ordenado por data/hora

#### Cliente (`/cliente`)
- `GET /cliente/count` - Retorna o número total de clientes
  - Retorna: Número inteiro com a contagem
- `GET /cliente/inactive?dataLimite=YYYY-MM-DD` - Lista clientes inativos
  - Retorna: Nome, CPF e data da última compra
  - Inclui clientes que nunca compraram ou última compra antes da data limite

#### Animal (`/animal`)
- `GET /animal/count` - Retorna o número total de animais
  - Retorna: Número inteiro com a contagem
- `GET /animal/by-cliente/:cpfCliente` - Lista animais de um cliente específico
  - Retorna: Nome, espécie, raça, sexo, peso, data de nascimento e nome do dono
  - Ordenado por nome do animal

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

O projeto inclui um arquivo `.env_developer` com as configurações padrão de desenvolvimento.

### Configuração

1. Copie o arquivo de exemplo:
```bash
cp .env_developer .env
```

2. Edite o arquivo `.env` se necessário para ajustar às suas configurações locais.

### Variáveis Disponíveis

```env
# Database Configuration (para desenvolvimento local)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=petshop
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# PostgreSQL Configuration (para Docker Compose)
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=petshop
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

**Nota:** O arquivo `.env` é ignorado pelo Git para proteger suas credenciais. Use sempre o `.env_developer` como referência.
