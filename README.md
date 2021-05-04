# notes-app-nodejs

## Simple notes app for NodeJS with authentication via PassportJS.

### Installation:
```
npm i
```

### You must create an .env file with the environment variables that store the credentials of a MongoDB Atlas database (in the MONGODB_URI string with USER_NAME, PASSWORD and DBNAME). The following variable stores the secret string used for express-session. The last item you must create is used to provide a subroute on the server (eg, Nginx). If the application is deployed on a Heroku-type server, it will be necessary to configure these environment variables, except for the one that refers to the subrout, which must be left empty.
```
PORT=xxxx
MONGODB_URI=mongodb+srv://xxxx:xxxx@cluster0.4temp.mongodb.net/xxxx?retryWrites=true&w=majority
SECRET_SESSION=xxxx
PREFIX_APP=/xxxx

(replace 'xxxx' with the corresponding values)
```
### In the latter case, it is not necessary to set the port or configure the prefix of the subroute in said .env file.
