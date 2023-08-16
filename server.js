const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let chillies = [];
let count = 0;

app.get('/chillies', (req,res)=> {
  res.send(chillies);
  console.log('get all chillies');
});

app.get('/chillies/:id', (req, res) => {
  console.log(`get a chilli with id ${req.params.id}`);
  // check if a chilli with matching id was found
  const chilliMatch = chillies.find((c) => c.id == req.params.id);

  // if no id was found send chilliMatch will be undefined which is falsy

  if(chilliMatch) {
    res.send(chilliMatch);
  } else {
    res.sendStatus(400);
  }
});

app.post('/chillies', (req, res) => {
  const newChilli = { id: count, ...req.body };
  count =count +1;
  chillies.push(newChilli);
  console.log(chillies);
  res.send(newChilli);
});

app.put('/chillies/:id', (req, res) => {
  console.log(chillies);
  const chilliIndex = chillies.findIndex((c) => c.id == req.params.id);

  // If no id is found, send chilliMatch will be undefined which is falsy

  if (chilliIndex != -1) {
    chillies[chilliIndex] = req.body;
    console.log(req.body);
    res.send(chillies[chilliIndex]);
  }else {
    res.sendStatus(400);
  }
});

app.delete('/chillies/:id', (req, res) => {
  console.log(`delete a chilli with id ${req.params.id}`);

  let deletedChilli =chillies.find((c) => c.id == req.params.id);

  if (!deletedChilli) {
    res.sendStatus(400);
  } else {
    chillies = chillies.filter((c) => c.id != req.params.id);
    res.send(deletedChilli);
  }
});

app.all('/', (req, res) => {
  res.sendStatus('404');
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});