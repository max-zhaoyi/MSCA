# MSCA - Massively Scalable Chat App

The goal is to create a simple chat application that can scale to thousands/millions of users.
Think of a single Discord channel where any user can connect to and start sending/reading messages.

To connect (http) : http://msca-autoscale.link/

### As a user, I want to:
- Access the website via a URL.
- Be able to send a message using an alias (1 text box for the alias, 1 text box for the message)
- ~~Sending a message will broadcast it to all other users currently viewing the website~~
- Be able to read new messages in a chat history
- Be able to see the alias of the person sending a message as long as the date/time it was sent at.
- Be able to see up to 25 of past messages sent when I wasn't connected.

### Stack:
- NodeJS (express, html, css)
- Redis (Redis Cloud, Redis Streams, ioredis)
- AWS (ec2, elb, Auto Scaling Groups, Route 53)

### Issues: 
- Display time is locked to EC2's timezone (GMT +0)
- Page does not dynamically reload (On incoming message page needs to be refreshed)
- Blank entries are added to the Redis database

### Notes:
- I should have used a front-end framework such as React to implement the dynamic webpage
- I experimented with socket.io however I wasn't able to get Redis Streams to work async. Perhaps Pub/Sub would have worked better
