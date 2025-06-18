# Abertura de Empresas

Projeto desenvolvido como parte de um case técnico, utilizando Angular 16 com integração a uma API fake para simular o fluxo de solicitação de abertura de empresas.

Repositório oficial: [https://github.com/GustavoHLC/Abertura-De-Empresa](https://github.com/GustavoHLC/Abertura-De-Empresa)

---

## Tecnologias Utilizadas

- [Angular 16](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/)
- [json-server](https://github.com/typicode/json-server)
- [IBGE API](https://servicodados.ibge.gov.br/api/v1/localidades/estados)

---

## Requisitos

Antes de começar, certifique-se de ter instalado:

| Requisito       | Versão recomendada  |
|------------------|---------------------|
| **Node.js**      | `v20.16.0`          |
| **NPM**          | `v10+`              |
| **Angular CLI**  | `v16.2.10`          |

### Como instalar

#### 📦 Node.js e NPM

1. Acesse o site oficial: [https://nodejs.org](https://nodejs.org)
2. Baixe e instale a **versão LTS recomendada**.
3. Após a instalação, verifique as versões com os comandos:

```bash
node -v
# Deve exibir algo como: v20.16.0

npm -v
# Deve exibir algo como: 10.x.x
```

> **Importante:** O NPM já é instalado junto com o Node.js.

---

#### ⚙️ Angular CLI

Após instalar o Node.js e o NPM, instale a Angular CLI com:

```bash
npm install -g @angular/cli@16
```

Para verificar se foi instalado corretamente:

```bash
ng version
# Confirme que aparece a versão 16.2.10 ou similar
```

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/GustavoHLC/Abertura-De-Empresa.git
cd Abertura-De-Empresa
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a API fake (json-server)

```bash
npm run mock
```

Isso iniciará a API em:  
`http://localhost:3000`

#### Endpoints disponíveis:

| Endpoint                          | Descrição                     |
|----------------------------------|-------------------------------|
| `GET /empresas`                  | Lista todas as empresas       |
| `GET /empresas/:id`              | Visualiza empresa por ID      |
| `POST /empresas`                 | Cadastra uma nova empresa     |
| `PUT /empresas/:id`              | Atualiza uma empresa          |
| `GET /entidade-registro`         | Lista entidades               |
| `GET /localidades/estados`       | Lista de estados via IBGE     |

> O arquivo `db.json` está localizado em `mocks/db.json`.

### 4. Rode a aplicação Angular

```bash
npm start
```

A aplicação estará disponível em:  
 `http://localhost:4200`

---

## Estrutura Inicial

```
Abertura-De-Empresa/
├── src/
│   ├── app/                  # Componentes e lógica da aplicação
│   ├── environments/         # Configuração de ambiente
│   └── styles.css            # Estilo global (inclui Bootstrap)
├── mocks/
│   └── db.json               # API fake usada pelo json-server
├── angular.json              # Configuração do Angular CLI
├── package.json              # Dependências e scripts
```

---

## Scripts úteis

| Comando         | Descrição                                   |
|----------------|----------------------------------------------|
| `npm start`     | Inicia a aplicação Angular (`ng serve`)      |
| `npm run mock`  | Inicia a API fake usando `json-server`       |

---

## Estilo

O projeto utiliza **Bootstrap 5** para a base visual e **ngx-bootstrap** para componentes reutilizáveis como modais, tooltips e datepickers.
