const express = require('express');
const app = express();

const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);

let sites = [];

app.get('/new/*', (req, res) => {
  if (urlRegex.test(req.params[0])) {
    let index = sites.indexOf(req.params[0]);
    if (index != -1) {
      res.json({ url: req.params[0], id: index});
    } else {
      sites.push(req.params[0]);
      res.json({ url: req.params[0], id: sites.length - 1})
    }
  } else {
    res.send('ERROR: Invalid URL');
  }
});

app.get('/:id', (req, res) => {
  if (req.params.id < sites.length) {
    res.redirect(sites[req.params.id]);
  } else {
    res.send('ERROR: Invalid ID');
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
})
