const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors({}));

app.get('/', (req, res) => {
  res.send('This is service posts')
});

app.get('/api/v1/posts', (req, res) => {
  res.send([
    {
      title: 'A title', 
      description: 'A description',
      content: '...',
      createdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'B title', 
      description: 'B description',
      content: '...',
      createdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'C title', 
      description: 'C description',
      content: '...',
      createdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
 console.log(`Service posts is listening on ${PORT}`);
});