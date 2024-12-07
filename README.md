# Sidekick

A Mastodon web client, in which the User can post through a variety of Bots.

![image](thumbnail.jpg)

## Architecture

Sidekick makes use of `masto.js` to post to the API of a specified mastodon server.

![architecture_image](architecture.png)

## Start

Both the frontend and the backend need to be running.
Node and npm need to be installed on the system.
Also, you need a mastodon account and API Token (you can get this easily via the settings in the Mastodon client).

### Frontend

First install the npm-dependencies via:

```bash
npm install
```

Then, run the following command under the ``frontend``-folder:

````bash
npm start
````

### Backend

First, you need to install the npm-dependencies via:

````bash
npm install
````

Then, you need to create a `.env`-file in the `backend`-folder and add your credentials like this:

````bash
URL="https://<my-instance>"
ACCOUNT_NAME="@<my-username>@<my-instance>"
MASTODON_API_TOKEN="<my-api-token>"
````

Then, run the following command under the `backend`-folder:

````bash
node .\index.js
````

The backend-service should be running.

### Opening the app

The frontend should be accessible on ``http://localhost:4200`` in a browser on the system, communicating with the backend over port 3000.

Congratulations! Now you should be all set and able to post to your Mastodon account with Sidekick.
