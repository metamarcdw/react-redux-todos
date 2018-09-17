import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello world!'
  })
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
