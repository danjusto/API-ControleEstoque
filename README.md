# API Controle de Estoque
API para controle de estoque de um restaurante delivery.

## 📜 Sumário
1. [Detalhes do projeto](https://github.com/DanJusto/API-ControleEstoque#1--detalhes-do-projeto)
2. [Tecnologias usadas](https://github.com/DanJusto/API-ControleEstoque#2--tecnologias-usadas)
3. [Para rodar o projeto](https://github.com/DanJusto/API-ControleEstoque#3--para-rodar-o-projeto)
4. [Documentação](https://github.com/DanJusto/API-ControleEstoque#4--documenta%C3%A7%C3%A3o)
5. [Autor](https://github.com/DanJusto/API-ControleEstoque#5--autor)

## 1. 🔍 Detalhes do projeto
A API Controle de Estoque tem como objetivo persistir dados para gerenciamento do estoque de um restaurante. Foi realizado profissionalmente e transcrito neste repositório apenas como demonstração para fins acadêmicos. A troca de dados é realizada em formato JSON e utiliza-se o MySQL como banco de dados.
 
#### Cenário:
* Sistema permite o carregamento de um arquivo .csv para fazer um primeiro cadastro de produtos em massa;
* Sistema valida as informações e retorna se há algo errado com os registros. O front-end apenas permite a persistência dos dados se todas as validações tiverem sucesso;
* Com o banco de dados preenchido, o front-end não permite mais o carregamento de aquivo .csv e a atualização, criação e deleção é feita de forma unitária;
* Sistema não permite cadastro quantidade negativa ou em valor superior ao estoque máximo;
* Sistema lista quais produtos se encontram em criticidade (inferior a 15% do estoque máximo);

## 2. 💻 Tecnologias usadas
<div align="center">

Languages, Frameworks & Librarys:   
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

Tests:  
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Database:  
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

IDE:  
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

</div>

## 3. 🔌 Para rodar o projeto
1. Instale as dependências necessárias para rodar a API (relacionadas no package.json):

    ```
    npm install
    ```
2. A API utiliza o MySQL como banco de dados, então se faz necessário que você tenha-o instalado em sua máquina.

3. Com ele instalado, crie um database e preencha o arquivo ".env.example" com o host, user_db, password_db e database_name. Em seguida, retire o ".example", deixando apenas ".env" como nome do arquivo.

4. Também é necessário preencher a porta a ser utilizada e o secret da criptografia da senha dos usuários no arquivo ".env".

5. Rode a aplicação em ambiente de desenvolvimento:

    ```
    npm run dev
    ```
6. O comando já irá rodar as migrations e criar as tabelas, deixando-as prontas para uso.

7. Você precisará de uma ferramenta de teste de requisições como o [Insomnia](https://insomnia.rest/), devendo seguir as orientações da documentação abaixo para utilizar a API.

8. Para rodar os testes automatizados já criados:
    ```
    npm run test
    ```
## 4. 🔌 Documentação
### Endpoints

**Sessions** <br/>
[`POST /sessions/`](#post-sessions) - Autenticação de usuário (login)
<br/><br/>

**Users** <br/>
[`POST /users/`](#post-users) - Criação de um novo usuário
<br/><br/>

**File** <br/>
[`GET /file/`](#get-file) - Armazenamento de arquivo ".csv" na pasta do projeto e valida os registros encontrados
[`POST /file/`](#post-file) - Persiste os registros no banco de dados
<br/><br/>

**Products** <br/>
[`POST /products/`](#post-products) Persiste um produto no banco de dados <br/>
[`GET /products/`](#get-products) Busca de todos produtos <br/>
[`GET /products/:id`](#get-products-id) Busca de produto específico <br/>
[`PUT /products/:id`](#put-products) Atualização de dados de um produto <br/>
[`PATCH /products/:id/acrescentar`](#patch-products) Acréscimo da quantidade do produto no estoque <br/>
[`PATCH /products/:id/decrementar`](#patch-products) Diminuição da quantidade do produto no estoque <br/>
[`DELETE /products/:id`](#delete-products) - Deleção de um produto
<br/><br/>

###
#### POST sessions

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|email|sim|`string`|E-mail do usuário|
|password|sim|`string`|Senha do usuário|

<br />

> **_NOTA:_**  Não é necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
  "user": [
    {
      "user_id": 1, //número incremental
      "name": "Testador",
      "email": "teste@email.com",
      "password": "senha", //criptografada
      "created_at": "xxxx-xx-xxTyy:yy:yy" //data e hora criados automaticamente
    }
  ],
  "token": "abcdefghijklmnopqrstuvwxyz"
}
```
```status: 200```
<br /><br /> 
Erro comum

```json
{
    "mensagem": "E-mail e/ou senha incorreta.",
}
```
```status: 401```
<br/>

###
#### POST users

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|name|sim|`string`|Nome para perfil|
|email|sim|`string`|E-mail do usuário ou admin|
|password|sim|`string`|Senha do usuário ou admin|

<br />

> **_NOTA:_**  Não é necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso  
```json
{
	"user_id": 1,
  "name": "Testador",
  "email": "teste@email.com",
  "password": "senha", //criptografada
  "created_at": "xxxx-xx-xxTyy:yy:yy" //data e hora criados automaticamente
}
```
```status: 201```
<br /><br /> 
Erro comum

```json
{
    "mensagem": "Este email já está em uso.",
}
```
```status: 400```
<br/>

###
#### GET file

**Request**

Arquivo .csv com quatro atributos. Exemplo:

|**sku**|**nome**|**estoque_max**|**quantidade**|
| :------------ | :------------ | :------------ | :------------ |
|SKU0001|Queijo Prato Kg|30|5|
|SKU0002|Tomate Kg|20|10|
|SKU0003|Coca-cola Lata Un|200|50|

<br />

**Response**

Sucesso e registros válidos
```json
[
  {
		"sku": "SKU0001",
		"nome": "Queijo Prato Kg",
		"validacao": "ok"
	},
	{
		"sku": "SKU0002",
		"name": "Tomate Kg",
		"validacao": "ok"
	},
	{
		"sku": "SKU0003",
		"name": "Coca-cola Lata Un",
		"validacao": "ok"
	}
]
```
```status: 200```
<br /><br /> 

Sucesso e registros inválidos
```json
[
  {
		"sku": "SKU0001",
		"nome": "Queijo Prato Kg",
		"validacao": "ok"
	},
	{
		"sku": "SKU0002",
		"name": "Tomate Kg",
		"validacao": "Quantidade (inserida ou total) não pode ser negativa"
	},
	{
		"sku": "SKU0003",
		"name": "Coca-cola Lata Un",
		"validacao": "Quantidade supera o estoque máximo"
	}
]
```
```status: 200```
<br /><br />

Erros comuns

```json
{
    "mensagem": "Falha ao receber o arquivo. Verifique se o arquivo é um .csv",
}
```
```status: 400```
```json
{
    "mensagem": "Arquivo .csv não possui nenhum registro.",
}
```
```status: 400```
<br/>

###
#### POST file

**Request**

Arquivo .csv já está armazenado na pasta do projeto em razão da requisição anterior e a requisição apenas é disparada pelo front-end caso todas as validações retornem "ok".
  
```Não é necessário enviar informações na requisição```

<br />

**Response**

Sucesso  
```json
[
  {
		"id": 1,
		"sku": "SKU0001",
		"name": "Queijo Prato Kg",
		"quantidade": 30,
		"estoque_max": 5
	},
	{
		"id": 2,
		"sku": "SKU0002",
		"name": "Tomate Kg",
		"quantidade": 20,
		"estoque_max": 10
	},
	{
		"id": 3,
		"sku": "SKU0003",
		"name": "Coca-cola Lata Un",
		"quantidade": 200,
		"estoque_max": 50
	}
]
```
```status: 201```

<br/>

###
#### GET products

**Request**

Buscar todos produtos
|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|-|-|-|Não é necessário enviar nenhum parâmetro|

<br />

> **_NOTA:_**  É necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
    "listaProdutos": [
      {
        "id": 1,
        "sku": "SKU0001",
        "name": "Queijo Prato Kg",
        "quantidade": 30,
        "estoque_max": 5
      },
      {
        "id": 2,
        "sku": "SKU0002",
        "name": "Tomate Kg",
        "quantidade": 20,
        "estoque_max": 10
      },
      {
        "id": 3,
        "sku": "SKU0003",
        "name": "Coca-cola Lata Un",
        "quantidade": 200,
        "estoque_max": 50
      }
    ],
    "listaEstoqueCritico": [
      "SKU0001"
    ]
}
```
```status: 200```

<br /> <br /> 
Sucesso sem retorno de dados

```json
{
  :[]
}
```
```status: 200```
<br/>

###
#### GET products/:id

**Request**

Buscar produto específico
|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|Enviar via parâmetro de rota|

<br />

> **_NOTA:_**  É necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
  "id": 2,
  "sku": "SKU0002",
  "name": "Tomate Kg",
  "quantidade": 20,
  "estoque_max": 10
}
```
```status: 200```

<br /><br />
Erro comum

```json
{
    "mensagem": "Arquivo .csv não possui nenhum registro.",
}
```
```status: 400```

<br/>

###
#### POST products

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|sku|sim|`string`|Código de identificação do produto|
|nome|sim|`string`|Nome do produto|
|quantidade|sim|`number`|Quantidade do produto|
|estoque_max|sim|`number`|Estoque máximo para produto|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```json
{
	"id": 1,
	"sku": "SKU0001",
	"name": "Queijo Prato Kg",
	"quantidade": 20,
	"estoque_max": 50
}
```
```status: 201```
<br/><br/>
Erros comuns

```json
{
    "mensagem": "SKU já cadastrado.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade (inserida ou total) não pode ser negativa.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade supera o estoque máximo.",
}
```
```status: 400```
<br/>

###
#### PUT products

**Request**

SKU não pode ser modificado. Qualquer outra informação pode ser modificada, mas não é obrigatória.

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|ID do produto que será atualizado (recebido por parâmetro)|
|nome|não|`string`|Nome do produto|
|quantidade|não|`number`|Quantidade do produto|
|estoque_max|não|`number`|Estoque máximo para produto|


<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```json
{
	"id": 1,
	"sku": "SKU0001",
	"name": "Queijo Prato Kg",
	"quantidade": 30,
	"estoque_max": 50
}
```
```status: 200```
<br/><br/>
Erros comuns

```json
{
    "mensagem": "Produto não existe.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade (inserida ou total) não pode ser negativa.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade supera o estoque máximo.",
}
```
```status: 400```
<br/>

###
#### PATCH products/:id/acrescentar

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|ID do produto que terá a quantidade aumentada (recebido por parâmetro)|
|quantidade|sim|`number`|Quantidade a ser acrescentada (não é a nova quantidade e sim o valor a ser somado)|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```json
{
	"id": 1,
	"sku": "SKU0001",
	"name": "Queijo Prato Kg",
	"quantidade": 35,
	"estoque_max": 50
}
```
```status: 200```
<br/><br/>
Erros comuns

```json
{
    "mensagem": "Produto não existe.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade (inserida ou total) não pode ser negativa.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade supera o estoque máximo.",
}
```
```status: 400```
<br/>

###
#### PATCH products/:id/decrementar

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|ID do produto que terá a quantidade diminuida (recebido por parâmetro)|
|quantidade|sim|`number`|Quantidade a ser reduzida (não é a nova quantidade e sim o valor a ser subtraído)|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```json
{
	"id": 1,
	"sku": "SKU0001",
	"name": "Queijo Prato Kg",
	"quantidade": 25,
	"estoque_max": 50
}
```
```status: 200```
<br/><br/>
Erros comuns

```json
{
    "mensagem": "Produto não existe.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade (inserida ou total) não pode ser negativa.",
}
```
```status: 400```
```json
{
    "mensagem": "Quantidade supera o estoque máximo.",
}
```
```status: 400```
<br/>

###
#### DELETE products/:id

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|ID do produto que será deletado (recebido por parâmetro)|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 204```
<br/> <br/>

Erro comum

```json
{
    "mensagem": "Produto não existe.",
}
```
```status: 400```
<br/>

## 5. 👨‍💻 Autor
Criado por Daniel Justo  
  
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielmjusto/)
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanJusto)  
  
Obrigado pela visita!