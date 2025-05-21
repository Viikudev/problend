# Problend

Problend es una aplicación construida con [Next.js](https://nextjs.org) que permite la gestión y resolución de issues entre usuarios. El proyecto está enfocado en la colaboración y la interacción eficiente entre quienes reportan problemas y quienes los resuelven.

## Demo

[Enlace a la demo](https://problend.vercel.app/)

## Características principales

- Gestión de issues: creación, visualización y resolución.
- Sistema de respuestas y aceptación/rechazo de soluciones.
- Interfaz moderna y responsiva.
- Integración con Clerk para autenticación de usuarios.

## Uso de Clerk

Este proyecto utiliza [Clerk](https://clerk.com/) para la autenticación y gestión de usuarios.  

- Registro e inicio de sesion mediante la plataforma de Clerk mediante Google o Github. 🔑
- Uso de webhooks para cargar los datos del usuario en la base de datos. 🔗
- Proteccion de rutas para las funcionalidades que requieran de que el usuario este autenticado. 🛡️

## Instalación y ejecución

1. Clona el repositorio:

   ```js
   git clone https://github.com/Viikudev/problend.git
   cd problend
   ```
   

2. Instala las dependencias:

   ```js
   npm install
   ```
   # o
   ```js
   yarn install
   ```

4. Configura las variables de entorno necesarias en tu archivo ".env" :

   #claves de clerk:

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_WEBHOOK_SIGNING_SECRET= whsec\*...

   #url de tu DB
   DATABASE_URL= 'url de tu DB postgresql'

   #redirecciones post sign in/sign up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

5. Haz la migracion de los modelos a tu DB:
   npx prisma migrate dev --name <nombre_de_la_migracion>
   npx prisma generate

6. Inicia el servidor de desarrollo:

   ```js
   npm run dev
   ```
   # o
   ```js
   yarn dev
   ```
   

8. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Tecnologías utilizadas

- Next.js
- Clerk
- React
- TypeScript
- Postgresql
- Tailwindcss
