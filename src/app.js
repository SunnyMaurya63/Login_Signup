const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
const LogInCollection = require("./mongodb");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');

app.set('view engine', 'hbs');
app.set('views', templatePath);

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking) {
            res.send("User details already exist");
        } else {
            const data = {
                name: req.body.name,
                password: req.body.password
            };

            await LogInCollection.create(data);

            res.status(201).render("home", {
                naming: req.body.name
            });
        }
    } catch (error) {
        console.error("Error in signup route:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.name}` });
        } else {
            res.send("Incorrect password or user not found");
        }
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
