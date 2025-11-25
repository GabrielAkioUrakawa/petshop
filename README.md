# Petshop - Sistema de Gerenciamento

Sistema completo de gerenciamento para petshop com backend em NestJS e frontend em Next.js.

## Tecnologias

- **Backend:** NestJS + TypeScript + PostgreSQL
- **Frontend:** Next.js 16 + React 19 + TailwindCSS
- **Database:** PostgreSQL 16
- **Containerização:** Docker + Docker Compose

## Como rodar

### Passo 1 - Instale o Docker

- Acesso o site oficial do Docker: [https://www.docker.com](https://www.docker.com)
- Clique em 'Download Docker Desktop' e selecione o download para o seu sistema operacional.
- Faça a instalação padrão do Docker (Não é necessário criar conta!).

### Passo 2 - Clone o repositório

```bash
git clone https://github.com/GabrielAkioUrakawa/petshop.git
```

Em seguida, navegue até a pasta do projeto:

```bash
cd petshop
```

### Passo 3 - Configuração das variáveis de ambiente

Dentro da pasta do projeto execute:

```bash
# Copiar arquivo de exemplo para .env
cp .env_developer .env
```

### Passo 4 - Executar todos os serviços com Docker

Para esse passo é necessário que o aplicativo do Docker esteja aberto e rodando na sua máquina.

Dentro da pasta do projeto execute:

```bash
# Rodar projeto
docker compose --profile full up --build
```

Pronto, agora você tem todo a aplicação rodando em http://localhost:4000

### Serviços Disponíveis

- **Frontend:** http://localhost:4000
- **Backend API:** http://localhost:3000
- **PostgreSQL:** localhost:5432
- **Adminer (DB Admin):** http://localhost:8080

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
- `GET /produto/best-sellers` - Lista produtos mais vendidos

#### Serviço (`/servico`)
- `GET /servico/count` - Retorna o número total de serviços
- `GET /servico/revenue-by-month?mes=MM&ano=YYYY` - Retorna o faturamento do mês
- `GET /servico/by-fornecedor/:nomeFornecedor` - Lista serviços por fornecedor dos produtos utilizados no serviço
- `GET /servico/by-date?dataEspecifica=YYYY-MM-DD` - Agenda diária de serviços

#### Funcionário (`/funcionario`)
- `GET /funcionario/employee-of-the-month?mes=MM&ano=YYYY` - Retorna o funcionário destaque do mês
- `GET /funcionario/with-service-count` - Lista funcionários com contagem de serviços

#### Compra (`/compra`)
- `GET /compra/by-date-range?dataInicio=YYYY-MM-DD&dataFinal=YYYY-MM-DD` - Compras por período

#### Cliente (`/cliente`)
- `GET /cliente/count` - Retorna o número total de clientes
- `GET /cliente/inactive?dataLimite=YYYY-MM-DD` - Lista clientes inativos

#### Animal (`/animal`)
- `GET /animal/count` - Retorna o número total de animais
- `GET /animal/by-cliente/:cpfCliente` - Lista animais de um cliente específico

