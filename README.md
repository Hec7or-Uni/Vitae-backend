## Overview
## Docs Reference
* [Express.js](https://expressjs.com/)
* [NextAuth.js](https://next-auth.js.org/)
* [mongodb](https://www.mongodb.com/)

## Getting Started
#### `.env`
All the following methods need this file.
```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
MONGODB_URI=
SPOONACULAR_API_KEY=
E_HOST=
E_PORT=
E_USER=
E_PASS=
SERVER_PREFIX=
LIST_ID=
MAILCHIMP_API_KEY=
```
To create the secret you can run the following command in linux `openssl rand -hex 128` or visit the following [page](https://generate-secret.now.sh/128).

#### Without Docker
Prerequisites
You will need [node.js](https://nodejs.org/es/) & [npm](https://www.npmjs.com/)
```
# 1. Clone the repository
git clone https://github.com/Hec7or-Uni/Vitae-backend
# 2. Install the dependencies with:
# make sure that the module: '~/node_modules_next-auth' is the one you download from the repository, otherwise it will not work correctly.
npm install
# 3. Run the project:
npm run build
npm run start
```