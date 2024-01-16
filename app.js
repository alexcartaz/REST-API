'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

//models
let User = require('./models').User;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

function asyncHandler(cb){
  return async(req, res, next) => {
    try{
      await cb(req, res, next)
    } catch(error){
      next(error)
    }
  }
}

const db = require('./models');

//connect to db
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database successful!');
    //sync model with db
    db.sequelize.sync().then(() => {
      // ??
      //server.listen(port);
    });
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.get('/api/users', asyncHandler( async(req, res) => {
  let users = await User.findAll();
  res.json({
    message: users,
  });
}));

app.post('/api/users', asyncHandler( async(req, res) => {
  let user;
  try {
    // create a new book object in the database
    user = await User.create(req.body);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      //??
      user = await User.build(req.body);
    } else {
      throw error;
    }
  }
}));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
