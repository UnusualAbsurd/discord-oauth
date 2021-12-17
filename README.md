# Discord Oauth2 Example
The methods was taken from [Dank Memer Rewrite Website](https://github.com/DankMemer/dankmemer.lol) but this code is simplified only for the oauth2 codes. The design is completlely different , just the methods.

# [Live Preview](https://discord-oauth-react.netlify.app//)

## .env 
```env
COOKIE_SECRET= COOKIE_SECRET
CLIENT_ID= DISCORD CLIENT ID
CLIENT_SECRET= DISCORD CLIENT SECRET
CRYPT_KEYS= Array of crypt keys [2]
DOMAIN=http://localhost:3000 // Or the website domain
MONGODB_URI= MONGODB URI
MONGODB_DB= MONGODB COLLECTION NAME < ANY NAME >
REDIS_PORT=6379
REDIS_HOST=localhost
```

* Generating `CRYPT_KEYS` = 
```js
node -p "[ 32, 16 ].map(n => crypto.randomBytes(n).toString('base64'))"
```

* Cookie Secret ( At leat **32** characters long. ) <br />
#### [1password.com](https://1password.com/password-generator/)

# Written By  
[UnusualAbsurd](https://github.com/UnusualAbsurd)

# Method Authors
-   **Ronin** - _Initial work_ - [TheCyberRonin](https://github.com/TheCyberRonin)
-   **Mel** - _Initial design_ - [Melmsie](https://github.com/melmsie)
-   **Aetheryx** - _Basically the whole thing_ - [Aetheryx](https://github.com/aetheryx)
-   **InBlue** - _Taken over work for redesign_ - [InBlue](https://github.com/inblue)
-   **Badosz** - _Rewrite and feedback page_ - [badosz0](https://github.com/badosz0)
