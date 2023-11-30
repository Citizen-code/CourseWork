<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/Citizen-code/CourseWork">
    <img src="https://logos-download.com/wp-content/uploads/2019/06/Wheely_Logo-700x700.png" alt="Logo" width="100" height="100">
  </a>

  <h1 align="center">Wheely</h1>

  <p align="center">
    Данный проект представляет собой автоматизированную информационную систему для работы автосервиса
</div>

## Информация о проекте

Данный проект включает в себя возможности для автоматизации работы как со стороны сотрудника, так и со стороны клиента.

**Возможности системы:**
 
1. Ввод хранение и обработка заявок на техническое обслуживание.
2. Ввод хранение и обработка услуг.
3. Ввод хранение и обработка расходных материалов.
4. Автоматическая формирование отчетной документации.

### Проект построен с использованием

* [![Next][Next.js]][Next-url]
* [![C#][C#]][C#-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Express][Express]][Express-url]
* [![Bootstrap][Bootstrap]][Bootstrap-url]
* [![Git][Git]][Git-url]
* [![Nginx][Nginx]][Nginx-url]
* [![PostgreSQl][PostgreSQl]][PostgreSQl-url]

## Начало работы

Перед началом работы необходимо провести настройку среды
* npm
  ``` sh
  npm install --global yarn
  npm install -g nodemon
  ```
## Маршруты
Конечные точки api и авторизационного сервера представлены в публичном репозитории postman 

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman">](https://www.postman.com/blue-desert-305809/workspace/coursework )
### Установка

#### Api
1. Клонировать репозиторий на устройство
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Установить пакеты npm
   ```sh
   npm install
   ```
3. Вставить свои значения в файл переменных окружения `.env`
   ```js
   AUTH_URL=#Your AUTH_URL here
    FOLDER_PATH=#Your FOLDER_PATH here
    PORT=#Your PORT here
    DB_NAME=#Your DB_NAME here
    DB_USER=#Your DB_USER here
    DB_PASSWORD=#Your DB_PASSWORD here
    DB_HOST=#Your DB_HOST here
    DB_PORT=#Your DB_PORT here
   ```
#### Authorization
1. Клонировать репозиторий на устройство
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Установить пакеты npm
   ```sh
   npm install
   ```
3. Вставить свои значения в файл переменных окружения `.env`
   ``` js
    PORT=#Your PORT here  
    API_URL=#Your API_URL here
    CLIENT_URL=#Your CLIENT_URL here
    DB_NAME=#Your DB_NAME here
    DB_USER=#Your DB_USER here
    DB_PASSWORD=#Your DB_PASSWORD here
    DB_HOST=#Your DB_HOST here
    DB_PORT=#Your DB_PORT here
    JWT_ACCESS_SECRET=#Your JWT_ACCESS_SECRET here
    JWT_REFRESH_SECRET=#Your JWT_REFRESH_SECRET here
    PASSWORD_SALT=#Your PASSWORD_SALT here
    SMTP_HOST=#Your SMTP_HOST here
    SMTP_PORT=#Your SMTP_PORT here
    SMTP_USER=#Your SMTP_USER here
    SMTP_PASSWORD=#Your SMTP_PASSWORD here
   ```
#### Car service
1. Клонировать репозиторий на устройство
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Установить пакеты yarn
   ```sh
   yarn install
   ```
3. Вставить свои значения в файл переменных окружения `.env`
   ```js
   NEXT_PUBLIC_BASE_URL= #Your NEXT_PUBLIC_BASE_URL here
   ```

#### AutoserviceWPF
1. Клонировать репозиторий на устройство
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Установить пакеты dotnet
   ```sh
   dotnet install
   ```
## Использование

Данный проект разделен на две важные части: клиентская часть и часть сотрудника

#### Клиентская часть:
Позволяет добавлять информацию о клиенте и транспорте клиента, также она предоставляет возможность оформления заявки и просмотра истории заявок.
#### Часть сотрудника:
Позволяет обрабатывать информацию о клиентах, услугах, расходный материалов и заявок также она предоставляет возможность оформления отчета для заявки.

## Лицензия

Распространяется по лицензии MIT. Смотрите `LICENSE.txt` для получения дополнительной информации.

[contributors-shield]: https://img.shields.io/github/contributors/Citizen-code/CourseWork.svg?style=for-the-badge
[contributors-url]: https://github.com/Citizen-code/CourseWork/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Citizen-code/CourseWork.svg?style=for-the-badge
[forks-url]: https://github.com/Citizen-code/CourseWork/network/members
[stars-shield]: https://img.shields.io/github/stars/Citizen-code/CourseWork.svg?style=for-the-badge
[stars-url]: https://github.com/Citizen-code/CourseWork/stargazers
[issues-shield]: https://img.shields.io/github/issues/Citizen-code/CourseWork.svg?style=for-the-badge
[issues-url]: https://github.com/Citizen-code/CourseWork/issues
[license-shield]: https://img.shields.io/github/license/Citizen-code/CourseWork.svg?style=for-the-badge
[license-url]: https://github.com/Citizen-code/CourseWork/blob/master/LICENSE
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[C#]: https://img.shields.io/badge/c%23%20-%23239120.svg?&style=for-the-badge&logo=c-sharp&logoColor=white
[C#-url]: https://learn.microsoft.com/ru-ru/dotnet/csharp/
[JavaScript]: https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[TypeScript]: https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[Express]: https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge
[Express-url]: https://expressjs.com/ru/
[Bootstrap]: https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Git]: https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com
[Nginx]: https://img.shields.io/badge/nginx%20-%23009639.svg?&style=for-the-badge&logo=nginx&logoColor=white
[Nginx-url]: https://nginx.org/ru/
[PostgreSQl]: https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQl-url]: https://www.postgresql.org