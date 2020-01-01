const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.static('.'));

app.get('/hello', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
