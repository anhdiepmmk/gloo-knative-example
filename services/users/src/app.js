const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors({}));

app.get('/', (req, res) => {
  res.send('This is service users')
});

app.get('/api/v1/users', (req, res) => {
  res.send([
    {
      id: 1,
      name: 'Diep', 
      age: 18,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Lien', 
      age: 19,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Tu', 
      age: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
});

const PORT = 8081 || process.env.PORT;
app.listen(PORT, () => {
 console.log(`Service users is listening on ${PORT}`);
});