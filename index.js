const PORT = 5000

import express from 'express'
// import cors from 'cors'
// import axios from 'axios'


// require("dotenv").config()

const app = express()

app.get('/', (req, res) => 
{
  res.json('GET request to the homepage')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
