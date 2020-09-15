


const handleGeneratePdf = (req, res) => {
    // req validation
    const pdf = generatePDF(data, htmlTemplate);
    return res.end(pdf);
}

module.exports = {
    handleGeneratePdf
}