const express = require('express');
const app = express();

const generatePdf = require('./controllers/generatePdf');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.post('/generate-pdf', (req, res) => generatePdf.handleGeneratePdfA7(req, res))


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})