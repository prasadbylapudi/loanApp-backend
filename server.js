const express = require('express');
const cors = require('cors');
const app = express();
const applicationController = require('./controllers/applicationController');

app.use(cors());
app.use(express.json());
app.use('/api', applicationController);


app.listen(4000, () => {
  console.log('Listening on 4000');
});