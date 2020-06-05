const express = require('express')
const multer = require('multer')

const app = express()

app.use(multer().array())
app.use(require('./functions/save'))

app.listen(9001)
