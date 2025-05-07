To copy this repository run:

```
git clone https://github.com/Bogdan8282/mern-tailwind-app
```

Then use `npm run install-all` to install all necessary packages. Create `.env` file in your root directory and define variables like in this example:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://bogdan:s94KK61KmYZ2aIlZ@cluster0.iyodgzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super_secret_secret
CORS_ORIGIN=http://localhost:5000,http://localhost:5173
```

Don't forget to update the link in `vite.config.js` if necessary.

Now, you can use the following commands to configure the project:

`dev` - run app in development mode

`prod` - run app in production mode

`c-dev` - run only frontend (client) in development mode

`s-dev` - run only backend (server) in development mode

`install-all` - install all packages

If backend and frontend are connected, you should see the message "Server is running".
