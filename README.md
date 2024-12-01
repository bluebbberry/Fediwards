# Sidekick

A Mastodon web client, in which the User can post through a variety of Bots.

![image](thumbnail.jpg)

## Architecture

Sidekick makes use of masto.js to post to the API of a specified mastodon server.

![architecture_image](architecture.png)

## Start

Both the frontend and the backend need to be running.
Node and npm need to be installed on the system.
Also, you need an mastodon account and API Token (you can get this easily via the settings in the Mastodon client).

### Frontend

Run the following command under the ``frontend``-folder:

````bash
npm start
````

### Backend

Run the following command under the `backend`-folder:

````bash
node .\index.js "URL" "MY_TOKEN"
````

For example:

````bash
node .\index.js "https://mastodon.social" "MY_TOKEN"
````

Congratulations! Now you should be all set and able to post to your Mastodon account with Sidekick.
