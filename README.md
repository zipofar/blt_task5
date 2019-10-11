# Test Task #5 For Bright Lynx Team

## Task

Создать мультистраничное веб-приложение, содержащее: 
* Главную страницу, содержащую:
  * Название
  * Текст приветствия
  * Картинки
  * Видео (возможно использование API Youtube)
  * Кнопки регистрации и входа
  * Ссылки на другие страницы
  * Страницу регистрации

Минимальная функциональность:
* Cоздание учетной записи в базе данных.
* Страницу логина
* По нажатию кнопки “Вход” необходимо производить проверку корректности введенных логина-пароля и выводить сообщение об успешности логина.
* Страница, отображающая таблицу пользователей из базы данных.

Приложение может быть написано с использованием любых фреймворков. Предпочтительнее использовать следующую связку: 
* Бэк - Koa.js
* Фронт - Vue.js
* В качестве базы данных использовать PostgreSQL.
* В приложении необходимо реализовать REST API взаимодействие между фронтом и бэком.

## Install and Run

```bash
$ make ansible-development-setup
$ make compose 
```

OR only run

```bash
$ make dev
```

Open <https://localhost:3000>

## Project Features

* Авторизация пользователя сделана на основе сессий
* Сессии храняться в Http Only куках
* Часть стейта приложения дублируется на сервере, что позволяет перезагружать страницу и не терять текущее состояние
* Отправка POST запросов происходит под защитой csrf
* Можно посмотреть список пользователей, зайдя под учетной записью админа
* Главная страница может отображать любые html теги
* Каждый пользователь может редактировать только, принадлежащие ему записи

## Authentication

* Admin credentials:
  * login: admin
  * password: admin
* User credentials:
  * login: user0
  * password: pass0
