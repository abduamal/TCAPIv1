// to use express, it must be required
const express = require('express');
// express has been declared, and can be called
const app = express();
// later, there will be a tool that passes the port into the application.
// Until it is configured, 3000 serves as backup
const port = process.env.PORT || 3000;
// with every get request, this app will respond with a function that has the request and response
// we look at the request, then do something to respond back
// this is a get handler
app.get('/', (req, res) => {
  res.send('Welcome to TapChef API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
