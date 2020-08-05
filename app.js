//
const app = require('express')()
const blogs = require('./routes/blogs')
const bodyParser = require('body-parser')
const cors = require('cors')


//Middle
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', blogs)


//
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(Port)
})

module.exports = app