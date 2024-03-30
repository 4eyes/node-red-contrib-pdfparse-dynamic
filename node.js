const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);

        var node = this;
        this.name = n.name;
        for (var key in n) {
            node[key] = n[key] || "";
        }

        this.on('input', function (msg) {
            // Function to process PDF data
            const processPDF = (dataBuffer) => {
                pdf(dataBuffer).then(function(data) {
                    msg.payload = data;
                    node.send(msg);
                }).catch(function(error) {
                    node.error("Error parsing PDF: " + error);
                });
            };

            try {
                if (msg.filename) {
                    // If a file path is provided in msg, read the file
                    let dataBuffer = fs.readFileSync(msg.filename);
                    processPDF(dataBuffer);
                } else if (msg.payload && typeof msg.payload === 'string' && msg.payload.startsWith('data:application/pdf;base64,')) {
                    // If base64 data is provided in payload, convert it to a buffer and process
                    let base64Data = msg.payload.replace(/^data:application\/pdf;base64,/, '');
                    let dataBuffer = Buffer.from(base64Data, 'base64');
                    processPDF(dataBuffer);
                } else if (msg.payload instanceof Buffer) {
                    // If the payload is already a Buffer, process it directly
                    processPDF(msg.payload);
                } else {
                    // No valid PDF input found
                    node.error("No valid PDF file path or base64 data provided, and payload is not a buffer.");
                }
            } catch (e) {
                node.error("Error processing PDF: " + e);
            }
        });
    }
    RED.nodes.registerType("pdfparse", FunctionNode, {});
};
