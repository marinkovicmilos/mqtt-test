# mqtt-test
Every time it reconnects, the number of messages I receive multiplies.

```
node app.js
```

When the app starts, the result before the first reconnection:
- client.publish('msg', 'Hello')
- client.on('message') - received once

When it reconnects for the first time:
- client.publish('msg', 'Hello')
- client.on('message') - received twice
- client.on('message') - received twice

When it reconnects for the second time:
- client.publish('msg', 'Hello')
- client.on('message') - received thrice
- client.on('message') - received thrice
- client.on('message') - received thrice

...and so on
