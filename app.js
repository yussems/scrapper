const express = require('express')
const cors = require('cors');
const { fetchData } = require('./script')
const app = express()
const port = 3000 || process.env.PORT

require('dotenv').config()
const corsOptions = {
	origin: 'http://localhost:3001/',
	optionsSuccessStatus: 200
};
app.use(cors());
app.get('/', (req, res) => {
    fetchData().then(item => {
      res.json(item)
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})