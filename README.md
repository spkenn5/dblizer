# DBLizer

Dillinger is a Web based MySQL Client.

  - Setting configuration
  - Install dependencies
  - Run

# Setting Configuration!

  - Open `config/config.json` file to edit the config
  - Make sure the database and table exists
  - Make sure you have the correct user and password to your DB


### Tech

DBLizer uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* HTML/CSS/JavaScript - front-end view and event handling

### Installation

DBLizer requires [Node.js](https://nodejs.org/) v7+ to run.

```sh
$ git clone https://github.com/spkenn5/dblizer.git
$ cd dblizer
```

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ npm start
```

For production environments...

```sh
$ npm install --production
$ npm start production
```

### Improvements to be made
- Auto highlighting known mysql syntax
- Unit / Integration Testing
- Error Handling
- Dockerize the project
- Robust caching strategy
- Visualization of the schema
- Authentications


### Todos

 - Write Tests
 - Add error handling
