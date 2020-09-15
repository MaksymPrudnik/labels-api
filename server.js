const express = require('express');
const app = express();

const generatePdf = require('./controllers/generatePdf');

app.post('/generate-pdf', (req, res) => generatePdf.handleGeneratePdf(req, res))


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})