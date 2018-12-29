Uptime monitoring app

An "uptime monitor" allows users to enter URLs
they want to monitored and receive alerts when those 
resources "go down" or "come back up".
 
Specifiication
 
1. API listens on a PORT and accepts GET, POST, PUT, DELETE and HEAD http request
2. API allows a client to connect then create new user, then edit and delete that user.
3. User to be able to sign in which give them token that they can use for subsequent authenticated requests.
4. Same user to be able to sign out which invalidate their token,
5. Sign in user to use their token to check a new 'check'
6. Sign in user to edit or delete their checks and limit it to 5 checks.
7. In the backgrounds, worker perform all the "checks" at the appropriate times and sedn alerts to the 
user when a check changes its state from "up" and "down", or vise versa. Runs once a minute. (using Twilio SMS api)

