require('dotenv').config();

const { app } = require('./app');
const { connect } = require('./db');

const port = Number(process.env.PORT || 4000);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log('docs assistant api listening on ' + port);
    });
  })
  .catch((error) => {
    console.error('failed to start api', error);
    process.exit(1);
  });
