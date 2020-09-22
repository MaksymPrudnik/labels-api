const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex')
const jwt = require('jsonwebtoken')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.POSTGRES_URL, 
        ssl: Boolean(process.env.NODE_ENV)
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const auth = require('./controllers/auth');
const generatePdf = require('./controllers/generatePdf');

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, jwt))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt, jwt))
app.post('/generate-pdf', (req, res, next) => auth.requireAuth(req, res, next, jwt), (req, res) => generatePdf.handleGeneratePdfA7(req, res))


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})