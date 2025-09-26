# Vue.js SPA – Task Manager

## Descrição

SPA em **Vue 3** para gerenciar **Tasks** e **Users**, consumindo a **API Laravel 12** e integrando com o **microservice FastAPI + LangChain** para análise de desempenho do usuário.
Notificações via **Firebase Cloud Messaging (FCM)**.

---

## Tecnologias

* **Vue.js 3** – Framework frontend moderno
* **Vue Router 4** – Navegação SPA
* **Pinia 3** – Gerenciamento de estado
* **Axios** – Consumo da API Laravel
* **Firebase 12** – Notificações em tempo real
* **jwt-decode** – Decodificação de tokens JWT

---

## Funcionalidades

* Autenticação de usuários via JWT
* CRUD de Tasks
* Visualização de tarefas com sistema de **prioridade e farol de entrega**
* Notificações push via **Firebase Cloud Messaging**
* Integração com backend Laravel 12
* Rotas protegidas com **Vue Router**
* Gerenciamento de estado centralizado com **Pinia**

---

## Notificações

O app utiliza **Firebase Cloud Messaging (FCM)** para receber notificações push:

* Inscreve o usuário no FCM após login
* Recebe notificações enviadas pelo backend Laravel Scheduler
* Exibe alertas para tasks em atraso

---

## Gerenciamento de estado

* **Pinia** é usado para gerenciar estado global da aplicação:

  * Usuário autenticado
  * Lista de tasks
  * Notificações

---

## Rotas protegidas

* **Vue Router** protege páginas que exigem login
* Redireciona usuários não autenticados para a tela de login
* Decodificação de JWT feita com `jwt-decode` para controlar expiração do token

---

## Integrações

* **Laravel API** → CRUD de tasks, users e notificações
* **FastAPI + LangChain** → análise de desempenho do usuário
* **Firebase Cloud Messaging** → notificações push em tempo real
