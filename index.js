
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.send('<form method="post">\
	<input type="text" name="nom">\
	<input type="submit">\
</form>')
})

app.post('/', (req, res) => {
	let nom = req.body.nom
	res.send("Hello " + nom)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

