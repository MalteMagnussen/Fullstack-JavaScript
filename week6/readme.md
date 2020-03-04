# Week 6 FullStack JavaScript

While you watch Mosh's video make sure to write down the following info which you need for the comming days:

1. How to, dynamically, assign a port number via an environment variable

```JavaScript
// The port is dynamically assigned by the host environment on deployment.
// So we listen to the process.env ( environment variables )
// PORT
const port = process.env.PORT || 3000; // If env.PORT is set, use it. Otherwise, use 3000.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
```

2. How to use nodemon, to dynamically restart the server, whenever we make changes to our code

```Node
npm i -g nodemon
```

```JavaScript
// Now instead of node app.js we write nodemon app.js and nodemon will listen to changes.
```

3. How to read request parameters (/:id)

4. How to read query parameters (/?sort=asc)

5. How to read the request body (typically for POST or PUT)
