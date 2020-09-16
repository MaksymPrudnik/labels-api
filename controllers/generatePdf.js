const bwip = require('bwip-js');
const puppeteer = require('puppeteer');


const handleGeneratePdfA7 = (req, res) => {
    const data = req.body;
    if (
        !data.f2_1 || !data.f2_2 || !data.f2_3 || !data.f2_4 || !data.f2_5 || !data.f2_7 || 
        !data.f3_1 || !data.f4 || !data.f4_1 || 
        !data.f5_1 || !data.f5_2 || !data.f5_3 || !data.f5_4 || !data.f5_5 || !data.f5_6 || 
        !data.f5_7 || !data.f6_1 || 
        !data.f7_1 || !data.f8_1 || !data.f9_1 || !data.f10_1 || 
        !data.f12 || !data.f12_1 || !data.f13 || !data.f13_1 || !data.f14 || !data.f14_1 || 
        !data.f15 || !data.f15_1 || !data.f16 || !data.f16_1 || !data.f17 || !data.f17_1 || 
        !data.f18 || !data.f18_1 || 
        !data.f20_2 || !data.f20_4 || !data.f21_3 || !data.f22_3) {
        return res.status(400).json('Wrong params');
    }
    return generatePdfA7(data)
    .then((pdf) => {
        console.log('out of generate pdf')
        res.set('Content-Type', 'application/pdf');
        return res.send(pdf);
    })
    .catch(err => res.status(400).json(err));
}

const generatePdfA7 = (data) => {
    const f20_1 = bwip.toBuffer({
        bcid: 'gs1datamatrix',
        text: data.f20_2,
        height: 19
    })
    .then(png => png)
    .catch(console.log);
    const f20_3 = bwip.toBuffer({
        bcid: 'gs1-128',
        text: data.f20_4,
        height: 13
    })
    .then(png => png)
    .catch(console.log);
    const f21_2 = bwip.toBuffer({
        bcid: 'gs1qrcode',
        text: `(410)${data.f21_3}`,
        height: 19
    })
    .then(png => png)
    .catch(console.log);
    const f22_2 = bwip.toBuffer({
        bcid: 'gs1datamatrix',
        text: `(8002)${data.f22_3}`,
        height: 19
    })
    .then(png => png)
    .catch(console.log);
    return puppeteer.launch()
    .then(browser => browser.newPage())
    // copied from html template A7
    .then(page => {
        page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>A7</title>
        <style>
            *{box-sizing: border-box;}
            html, body {
                padding: 0;
                margin: 0;
                font-family: Arial, sans-serif;
                font-size: 0;
            }
            span {display: inline-block;}
            hr {background-color: black;width: 105mm;position:relative;left: -5mm;border: 0.5px solid black;}
            .label-container {
                height: 251mm;
                width: 105mm;
                padding: 5mm;
            }
            .f1 {
                height: 5mm;
                font-size: 12pt;
                background-color: black;
                color: white;
            }
            /* f2-f4 */
            .f2-f4 {height: 16mm;}
            .f2_{width: 29mm;}
            .f2, .f3, .f4, .f4_1 {display: inline-block;}
            .f3{width: 18.5mm;}
            .f4{width: 35.5mm;}
            .f4_1{width: 12mm;}
    
            /* f5-f6 */
            .f5-f6{height: 18mm;}
            .f5_{width: 29mm;}
            .f6_{height: 14mm;}
            .f6_1{line-height: 36pt;}
    
            /* f7-f11 */
            .f7-f11{height: 20mm;}
            .f7-f8{width: 38mm;}
            .f9-f11{width: 57mm;}
            .f7_, .f8_, .f9_, .f10_{height: 10mm;}
            .f11{height: 12mm;width: 12mm; float: right;}
            
            /* f12-f18 */
            .f12-f18{height: 122mm;width: 95mm;border: 2px solid black;box-sizing: content-box;}
            .f12-f13, .f14-f15, .f16, .f17-f18{height: 6mm;line-height: 6mm; width: 100%;}
            .f12_1-f13_1, .f14_1-f15_1, .f16_1, .f17_1-f18_1 div{height: 24.5mm;line-height: 24.5mm;}
    
            .spacer{height: 8mm;}
    
            /* f20-f22 */
            .f20-f22{height: 65mm;width: 95mm;}
            .f20_, .f21_, .f22_{height: 34mm;width: 31.7mm;}
            .f20{height: 5mm;align-items: flex-end;}
            .f21-f21_1, .f22-f22_1{height: 5mm;flex-direction: column;justify-content: flex-end;}
            .f20_1, .f21_2, .f22_2 {height: 19mm;width: 19mm;margin: 2mm auto;}
            .f20_3{height: 13mm;width: 95mm;}
    
            /* Extra */
            .fz4{font-size: 4pt;}
            .fz5{font-size: 5pt;}
            .fz6{font-size: 6pt;}
            .fz7{font-size: 7pt;}
            .fz9{font-size: 9pt;}
            .fz12{font-size: 12pt;}
            .fz14{font-size: 14pt;}
            .fz18{font-size: 18pt;}
            .fz36{font-size: 36pt;}
            .fz78{font-size: 104px;}
            .flex{display: flex;}
            .bold {font-weight: bold;}
            .tl {text-align: left;}
            .tr {text-align: right;}
            .tc {text-align: center;}
            .upper {text-transform: uppercase;}
            .mr{margin-right: 1mm;}
            .bdb{border-bottom: 2px solid #000;}
            .bdr{border-right: 2px solid #000;}
            .w50{width: 47.5mm;}
            .centered{justify-content: center;align-items: center;}
            .dyn-sz78, .dyn-sz14, .dyn-sz36{overflow: hidden;}
        </style>
    </head>
    <body>
        <div class="label-container">
            <div class="f1 bold tc">BEAst Label&trade; A7</div>
            <div class="f2-f4 flex">
                <div class="f2_">
                    <div class="f2 fz5 bold upper">from</div>
                    <div class="f2_1 fz6">${data.f2_1}</div>
                    <div class="f2_2 fz6">${data.f2_2}</div>
                    <div class="f2_3 fz6">${data.f2_3} ${data.f2_4}</div>
                    <div class="f2_4 fz6">${data.f2_5}</div>
                    <div class="f2_5 fz6 upper">Tel: ${data.f2_7}</div>
                </div>
                <div class="f3-f4">
                    <div class="f3 fz5 upper">ORDER NUMBER</div>
                    <div class="f4 fz4">${data.f4}</div>
                    <div class="f4_1 fz4 tr">${data.f4_1}</div>
                    <div class="f3_1 fz36 dyn-sz36"><span>${data.f3_1}</span></div>
                </div>
            </div>
            <hr />
            <div class="f5-f6">
                <div class="flex">
                    <div class="f5_">
                        <div class="f5 fz5 bold upper">FINAL DESTINATION</div>
                        <div class="f5_1 fz6">${data.f5_1}</div>
                        <div class="f5_2 fz6">${data.f5_2}</div>
                        <div class="f5_3 fz6">${data.f5_3}</div>
                        <div class="f5_4 fz6">${data.f5_4}</div>
                    </div>
                    <div class="f6_">
                        <div class="f6 fz5">PROJECT NUMBER</div>
                        <div class="f6_1 fz36 dyn-sz36"><span>${data.f6_1}</span></div>
                    </div>
                </div>
                <div class="flex">
                    <div class="f5_5 fz9 mr">${data.f5_5}</div>
                    <div class="f5_6 fz9 mr">${data.f5_6}</div>
                    <div class="f5_7 fz9">${data.f5_7}</div>
                </div>
            </div>
            <hr />
            <div class="f7-f11 flex">
                <div class="f7-f8">
                    <div class="f7_">
                        <div class="f7 fz5">BEST BEFORE</div>
                        <div class="f7_1 fz18">${data.f7_1}</div>
                    </div>
                    <div class="f8_">
                        <div class="f8 fz5">STORAGE TEMPERATURE</div>
                        <div class="f8_1 fz18">${data.f8_1}</div>
                    </div>
                </div>
                <div class="f9-f11">
                    <img class="f11" src="https://www.iconfinder.com/data/icons/tiny-icons-1/100/tiny-15-512.png" alt="">
                    <div class="f9_">
                        <div class="f9 fz5">PACKAGE WEIGHT</div>
                        <div class="f9_1 fz18">${data.f9_1}</div>
                    </div>
                    <div class="f10_">
                        <div class="f10 fz5">CONTENT</div>
                        <div class="f10_1 fz14 dyn-sz14"><span>${data.f10_1}</span></div>
                    </div>
                </div>
            </div>
            <div class="f12-f18 tc">
                <div class="f12-f13 flex bdb fz14 centered">
                    <div class="f12 bdr w50 dyn-sz14"><span>${data.f12}</span></div>
                    <div class="f13 w50 dyn-sz14"><span>${data.f13}</span></div>
                </div>
                <div class="f12_1-f13_1 flex bdb fz78 centered">
                    <div class="f12_1 bdr w50 dyn-sz78 flex centered"><span>${data.f12_1}</span></div>
                    <div class="f13_1 w50 dyn-sz78 flex centered"><span>${data.f13_1}</span></div>
                </div>
                <div class="f14-f15 flex bdb fz14 centered">
                    <div class="f14 bdr w50 dyn-sz14"><span>${data.f14}</span></div>
                    <div class="f15 w50 dyn-sz14"><span>${data.f15}</span></div>
                </div>
                <div class="f14_1-f15_1 flex bdb fz78 centered">
                    <div class="f14_1 bdr w50 dyn-sz78 flex centered"><span>${data.f14_1}</span></div>
                    <div class="f15_1 w50 dyn-sz78 flex centered"><span>${data.f15_1}</span></div>
                </div>
                <div class="f16 bdb fz14 flex centered dyn-sz14"><span>${data.f16}</span></div>
                <div class="f16_1 bdb fz78 flex centered dyn-sz78"><span>${data.f16_1}</span></div>
                <div class="f17-f18 flex bdb fz14 centered">
                    <div class="f17 bdr w50 dyn-sz14"><span>${data.f17}</span></div>
                    <div class="f18 w50 dyn-sz14"><span>${data.f18}</span></div>
                </div>
                <div class="f17_1-f18_1 flex fz78 centered">
                    <div class="f17_1 bdr w50 dyn-sz78 flex centered"><span>${data.f17_1}</span></div>
                    <div class="f18_1 w10 w50 dyn-sz78 flex centered"><span>${data.f18_1}</span></div>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="f20-f22 ">
                <div class="qr flex">
                    <div class="f20_">
                        <div class="f20 flex fz5">PACKAGE ID</div>
                        <div class="flex"><img class="f20_1" src=${f20_1} alt=""></div>
                        <div class="f20_2 bold fz7">${data.f20_2}</div>
                    </div>
                    <div class="f21_">
                        <div class="f21-f21_1 flex">
                            <div class="f21 fz5">GPS (WGS84)</div>
                            <div class="f21_1 fz5">FINAL DESTINATION</div>
                        </div>
                        <div class="flex"><img class="f21_2" src=${f21_2} alt=""></div>
                        <div class="f21_3 bold tc fz7">${data.f21_3}</div>
                    </div>
                    <div class="f22_">
                        <div class="f22-f22_1 flex">
                            <div class="f22 fz5">PHONE</div>
                            <div class="f22_1 fz5">FINAL DESTINATION</div>
                        </div>
                        <div class="flex"><img class="f22_2" src=${f22_2} alt=""></div>                    
                        <div class="f22_3 tc bold fz7">TEL: ${data.f22_3}</div>
                    </div>
                </div>
                <div class="bar">
                    <img class="f20_3" src=${f20_3} alt="">
                    <div class="f20_4 bold tc fz12">${data.f20_4}</div>
                </div>
            </div>
        </div>
        <script>
            const dynSizedArray78 = document.querySelectorAll('.dyn-sz78')
            dynSizedArray78.forEach(item => {
                const child = item.children[0];
                while (child.offsetWidth > item.offsetWidth) {
                    const fontSize = Number(child.style.fontSize.slice(0, -2));
                    child.style.fontSize
                    ? child.style.fontSize = (fontSize - 4) + 'px'
                    : child.style.fontSize = '100px'
                    if ((fontSize - 4) < 65 && fontSize > 0) {
                        child.textContent = child.textContent.slice(0, -1)
                    }
                }
            })
    
            const dynSizedArray36 = document.querySelectorAll('.dyn-sz36')
            dynSizedArray36.forEach(item => {
                const child = item.children[0];
                while (child.offsetWidth > item.offsetWidth) {
                    const fontSize = Number(child.style.fontSize.slice(0, -2));
                    child.style.fontSize
                    ? child.style.fontSize = (fontSize - 3) + 'px'
                    : child.style.fontSize = '45px'
                    if ((fontSize - 3) <= 27 && fontSize > 0) {
                        child.textContent = child.textContent.slice(0, -1)
                    }
                }
            })
    
            const dynSizedArray14 = document.querySelectorAll('.dyn-sz14')
            dynSizedArray14.forEach(item => {
                const child = item.children[0];
                while (child.offsetWidth > item.offsetWidth) {
                    const fontSize = Number(child.style.fontSize.slice(0, -2));
                    child.style.fontSize
                    ? child.style.fontSize = (fontSize - 1) + 'px'
                    : child.style.fontSize = '17.3px'
                    if ((fontSize - 1) < 14 && fontSize > 0) {
                        child.textContent = child.textContent.slice(0, -1)
                    }
                }
            })
        </script>
    </body>
    </html>
    `)
        return page;
    })
    .then((page) => page.pdf({width: '105mm', height: '251mm'}))
    .catch(err => Promise.reject(String(err)))    
}

module.exports = {
    handleGeneratePdfA7
}