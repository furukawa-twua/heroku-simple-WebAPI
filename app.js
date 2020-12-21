const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000
const ehime = require("./38EHIME.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.get('/', (req, res) => {
  const code = req.query.code;
  const callback = req.query.callback || "kbc";
  const address = ehime[code];
  if (address) {
    res.send(`${callback}({ result: ${JSON.stringify(address)}, message: null })`);
  } else {
    res.status(404).send(`${callback}({ result: null, message: '存在しません' })`);
  }
})

app.listen(port, () => {
  console.log(`Heroku simple WebAPI app listening at http://localhost:${port}`)
})

