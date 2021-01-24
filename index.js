
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
app.get('/', (req, res) => {
	res.render('main', {});
});

app.post('/', (req, res) => {
	let usuari = req.body.usuari;
	res.send("Hello " + usuari);
});

app.get('/register', (req, res) => {
	res.render('register.ejs', {});
});

app.post('/register', (req, res) => {
	let usuari = req.body.usuari;
	let contrasenya = req.body.pass;

	if ((!usuari || ! contrasenya)) {
		res.send("KO");
	} else {
		localStorage.setItem(usuari, contrasenya);
		res.send("<h1>OK<h1>")
	}
});

app.get('/login', (req, res) => {
	res.send('Login, my dude\
	<form method="post">\
	<input type="text" name="usuari"> <br>\
	<input type="password" name="pass"><br>\
	<input type="submit">\
	</form>');
});

app.post('/login', (req, res) => {
	let usuari = req.body.usuari;
	let contrasenya = req.body.pass;
	let contrasenya2 = localStorage.getItem(usuari)

	if ((!usuari || ! contrasenya) || (contrasenya !== contrasenya2) ) {
		res.send("KO"); 
	} else {
			res.send("OK")
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

