const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000
const ehime = require("./38EHIME.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  const code = req.query.code;
  const address = ehime[code];
  if (address) {
    res.send(`kbc({ result: ${JSON.stringify(address)}, message: null })`);
  } else {
    res.send("kbc({ result: false, message: '存在しません' })");
  }
})

app.listen(port, () => {
  console.log(`Heroku simple WebAPI app listening at http://localhost:${port}`)
})

