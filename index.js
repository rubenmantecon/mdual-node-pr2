
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

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
	let token = '';
	let dades = {password: contrasenya, token: token}

	if ((!usuari || !contrasenya)) {
		res.json("KO, something's wrong, please try again.");
	} else {
		localStorage.setItem(usuari, JSON.stringify(dades));
		res.json("OK, you are in.");
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
	let dadesUsuari = JSON.parse(localStorage.getItem(usuari));
	if (dadesUsuari == null){
		res.json("KO");
	} else {
		contraGuardada = dadesUsuari.password
		if ((!usuari || !contrasenya) || (contrasenya !== contraGuardada)) {
			res.json("KO");
		} else {
			let token = 'aguacate';
			res.json({status: "OK", token: token});
		}
	}

});

app.get("/api/login", (req, res) => {
	//
});

app.post("/api/login", (req, res) => {
	//
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

