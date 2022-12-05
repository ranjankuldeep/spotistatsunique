# spotistatsunique
Even Semester Project

## Ways to setup

1. Fork this repo and then clone this to your local machine.
2. Set up a mongodb clusture and copy mongodb URI.
3. Create an App in spotify developer API.
https://developer.spotify.com/dashboard/login
4. Copy Client Id and Client Secret from this project app.
5. Paste all these data in .env file.

<img width="880" alt="Screenshot 2022-12-05 at 10 03 34 AM" src="https://user-images.githubusercontent.com/95350799/205568189-4199017a-ef63-4e20-a6b2-0e5ee0269f40.png">
6. You have to now encode client id and client secret in base64 format.Here is the link to the site from where you can encode this.
https://www.base64encode.org/
7.<img width="160" alt="Screenshot 2022-12-05 at 12 26 17 PM" src="https://user-images.githubusercontent.com/95350799/205568827-d34ab3f8-7147-4100-9487-fa180a3f915e.png">
Above should be the format.NOTICE the colon sign in between.
For more details you can always refers to spotify api documentation.https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
<img width="931" alt="Screenshot 2022-12-05 at 12 29 19 PM" src="https://user-images.githubusercontent.com/95350799/205570126-b7cc1b04-3c75-4c85-89b6-6e22baef0f47.png">
Put this in spotify.js file in controllers directory, wherever necassary.I have put this ..... kind of sign.
<img width="880" alt="Screenshot 2022-12-05 at 9 44 31 AM" src="https://user-images.githubusercontent.com/95350799/205570390-5636dbff-b39b-43fd-9c6c-74b8d8ad3de8.png">
This actually helps in to get back new access token when expired with help of refersh token.

8.Once all these above task are done, write npm install and then npm start to run the development server.
If Everything goes right server will up running.

