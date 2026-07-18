import PDFParser from "pdf2json";

export function extractPdfText(fileBuffer) {
    return new Promise((resolve, reject) => {

        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", err => {
            reject(err.parserError);
        });

        pdfParser.on("pdfParser_dataReady", pdfData => {

            let text = "";

            pdfData.Pages?.forEach(page => {
                page.Texts.forEach(item => {
                    item.R.forEach(run => {
                        text += decodeURIComponent(run.T) + " ";
                    });
                });

                text += "\n";
            });

            resolve(text);
        });

        pdfParser.parseBuffer(fileBuffer);
    });
}