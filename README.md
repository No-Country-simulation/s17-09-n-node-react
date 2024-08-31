# Cases Law ⚖️ - Aplicación de Gestión para Abogados

[![main](https://github.com/No-Country-simulation/s17-09-n-node-react/actions/workflows/main.yml/badge.svg?branch=back-dev)](https://github.com/No-Country-simulation/s17-09-n-node-react/actions/workflows/main.yml)
[![deployment](https://github.com/No-Country-simulation/s17-09-n-node-react/actions/workflows/deployment.yml/badge.svg)](https://github.com/No-Country-simulation/s17-09-n-node-react/actions/workflows/deployment.yml)


**Objetivo de la App:**
La plataforma de Gestión para abogados es una herramienta diseñada para apoyar a los profesionales en Derecho en la gestión de Casos y Gestión de Plazos, que permite una transparencia del estado de causas generando una óptima administración del bufete mediante información actualizada y un control adecuado del seguimiento de plazos por causa.

## Tabla de Contenidos

1. [Comandos](#-comandos)
2. [Frontend](#-frontend)
   - [Construido con](#-construido-con-%EF%B8%8F)
   - [Desarrolladores](#-desarrolladores)
3. [Backend](#-backend)
   - [Construido con](#-construido-con-%EF%B8%8F-1)
   - [Desarrolladores](#-desarrolladores-1)
4. [QA Testing](#-qa-testing)
   - [Testeado con](#-testeado-con-%EF%B8%8F)
   - [Testers](#-testers)
5. [Comunicación](#communication)

## ✔ Comandos

### ⚙ Instalación
```
npm run front:install
```
```
npm run back:install
```
Nota: Se puede usar estos comandos para la instalación de paquetes específicos. Para instalar dependencias de desarrollo se debe utilizar el flag --save-dev o -D

### ⚙ Desinstalación
```
npm run front:uninstall <package-name>
```
```
npm run back:uninstall <package-name>
```

### ⚙ Desarrollo
```
npm run front:dev
```
```
npm run back:dev
```

### ⚙ Producción
```
npm run front:start
```
```
npm run back:start
```

## ✔ Frontend

### 👉🏻 Construido con 🛠️

![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-149eca?style=for-the-badge&logo=react&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=fff)
![React Router](https://img.shields.io/badge/React_Router-000?style=for-the-badge&logo=reactrouter&logoColor=fff)
![Render](https://img.shields.io/badge/Render-%23665CFF.svg?style=for-the-badge&logo=Render&logoColor=white)

### 👉🏻 Desarrolladores

|                                                                                                                           <img src="https://avatars.githubusercontent.com/u/95644790?v=4" width="50">                                                                                                                            |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/56366689?v=4" width="50">                                                                                                                        |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/107524509?v=4" width="50">                                                                                                                                                     |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/79112241?v=4" width="50">                                                                                                                                                      | 
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                                     **Ariel Rogel**                                                                                                                                                              |                                                                                                                                                    **David Yanez**                                                                                                                                                       |                                                                                                                                                    **Juan Gutiérrez**                                                                                                                                                                                  |                                                                                                                                                    **Manuel Filgueira Marín**                                                                                                                                                                          |
| <a href="https://github.com/Aricoins"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href=""><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                                  | <a href="https://github.com/David-Yanez"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/david--yanez/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                       | <a href="https://github.com/jumagu"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/jumagu/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                       | <a href="https://github.com/mf114090"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href=""><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                                                       |

|                                                                                                                           <img src="https://avatars.githubusercontent.com/u/82126093?v=4" width="50">                                                                                                                            |                                                                                                                           <img src="https://avatars.githubusercontent.com/u/121406663?v=4" width="50">                                                                                                                                                                          |                                                                                                                           <img src="https://avatars.githubusercontent.com/u/121879206?v=4" width="50">                                                                                                                                                                          |                                                                                                                           <img src="https://avatars.githubusercontent.com/u/141073960?v=4" width="50">                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                                     **Mica Hormazabal**                                                                                                                                                          |                                                                                                                                                     **Emanuel Nieto**                                                                                                                                                                                                           |                                                                                                                                                     **Nicolás Enciso**                                                                                                                                                                                                          |                                                                                                                                                     **Mauricio Paiva**                                                                                                                                                                                                          |
| <a href="https://github.com/MicaHormazabal"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href=""><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                            | <a href="https://github.com/negrura14"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/emanuel-nieto-230aab264/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                            | <a href="https://github.com/nicoenciso"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/nicolasenciso/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                                     | <a href="https://github.com/paiva73"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/mauricio-paiva-botta/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                                     |

|                                                                                                                           <img src="https://avatars.githubusercontent.com/u/139667149?v=4" width="50">                                                                                                                                                                        |                                                                                                                           <img src="https://avatars.githubusercontent.com/u/64821788?v=4" width="50">                                                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                                     **Ramiro Acosta**                                                                                                                                                                                                         |                                                                                                                                                     **Roy Huaman Avila**                                                                                                                                                                                                         |
| <a href="https://github.com/RamiroAcostaDev"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/ramiroacostadev/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                            | <a href="https://github.com/RoyHuamanAvila"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/royhuamanavila/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                            |


## ✔ Backend

### 👉🏻 Construido con 🛠️

![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-blue.svg?style=for-the-badge&logo=JWT&logoColor=%blue) 
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) 
![Render](https://img.shields.io/badge/Render-%23665CFF.svg?style=for-the-badge&logo=Render&logoColor=white)

### 👉🏻 Desarrolladores

|                                                                                                                           <img src="https://avatars.githubusercontent.com/u/75045716?v=4" width="50">                                                                                                                            |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/87621233?v=4" width="50">                                                                                                                                                            |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/95083531?v=4" width="50">                                                                                                                                                         |                                                                                                                       <img src="https://avatars.githubusercontent.com/u/123614305?v=4" width="50">                                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                                     **Billy Campagnoli**                                                                                                                                                         |                                                                                                                                                    **Juan Pablo Quintana**                                                                                                                                                                                   |                                                                                                                                                    **Samuel Bernal Nava**                                                                                                                                                                                 |                                                                                                                                                    **Facundo Castro**                                                                                                                                                                                                   |
| <a href="https://github.com/Bfix40"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href=""><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>                                    | <a href="https://github.com/jp-quintana"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/juan-pablo-quintana-685aa7165/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> | <a href="https://github.com/samuelbernal44"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/samuelbernal44/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>          | <a href="https://github.com/schweigenderFlugel"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/facundo-castro-87b864234/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>          |


## ✔ QA Testing

### 👉🏻 Testeado con 🛠️

![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white)
![Google Sheets](https://img.shields.io/badge/-Google%20Sheets-green?style=for-the-badge&logo=google&logoColor=white)
![Xmind](https://img.shields.io/badge/XMind-FF4500?style=for-the-badge&logoColor=white&logoSize=20&link=https%3A%2F%2Fxmind.app%2F)



### 👉🏻 Testers

|                                                                                                                       <img src="https://avatars.githubusercontent.com/u/47868656?v=4" width=50>                                                                                                                       |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                                  **Valeria Burgos**                                                                                                                                                  |
| <a href="https://github.com/valitab"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href=""><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> |

<hr/>

## Communication

[![](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=fff)](https://discord.gg/dyxDxw8w) [![](https://img.shields.io/badge/Slack-%23ED8B00?style=for-the-badge&logo=Slack&logoColor=fff)](https://slack.com/intl/es-pe/)


