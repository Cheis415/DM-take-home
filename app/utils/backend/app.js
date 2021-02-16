const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const inspiration = require('./mockDb');
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/inspirations', async function(request, response) {
  return response.json({ inspiration });
});

app.post('/inspirations', async function(request, response) {
  const inspirations = request.body.inspiration;
  if (typeof inspirations === "string") {
    inspiration.unshift(inspirations);
    return response.json({ inspirations });
  } 
  return response
    .status(400)
    .send('Expecting request body to be { "inspiration": /string/ }');
});

module.exports = app;
