Massively Scalable Chat App

The goal is to create a simple chat application that can scale to thousands/millions of users.
Think of a single Discord channel where any user can connect to and start sending/reading messages.

As a user, I want to:
- Access the website via a URL.
- Be able to send a message using an alias (1 text box for the alias, 1 text box for the message)
- Sending a message will broadcast it to all other users currently viewing the website
- Be able to read new messages in a chat history
- Be able to see the alias of the person sending a message as long as the date/time it was sent at.
- Be able to see up to 25 of past messages sent when I wasn't connected.

Stack:
- NodeJS (express, ws, ioredis)
- Redis (pubsub, store)
- AWS (ec2, elb, elasticache)

Extra notes:
- No need for authentication
- No need for input validation
- No database needed
- Load balancer needed for horizontal scaling (ELB)
- You'll need at least 2 NodeJS servers to test scaling
- As a general guideline, the whole backend shouldn't be longer than 200 lines of code
- The focus is on backend/infra, the frontend could be a single barebones HTML page no longer than 100 lines of code.

Bonus points:
- Using Cloudflare to host the app on a custom domain name
- Using Async/Await
