# node-red-contrib-pdfparse
================

Node-RED node for pdf-parse, enhanced to support file path from message, base64 encoded PDF, and direct buffer input.

## Features

- Parse PDF content from a specified file path, base64 encoded string, or direct buffer.
- Easily integrate PDF parsing capabilities within your Node-RED flows.

## Install

To install this forked version, you will need to use the GitHub URL since it's not published on npm. Run the following command in your Node-RED user directory, typically `~/.node-red`:

```bash
npm install 4eyes/node-red-contrib-pdfparse
```

## Usage

This node can be configured to parse PDF data from:

1. A filepath specified in the incoming message (`msg.filename`).
2. Base64 encoded PDF data in the incoming message's payload.
3. A Buffer containing PDF data directly in `msg.payload`.

## pdf-parse Module

This node is a wrapper around the Node.js module [pdf-parse](https://www.npmjs.com/package/pdf-parse), which provides detailed PDF parsing capabilities.

## Examples

For sample flows and usage, refer to the [sample.json](examples/sample.json) in the examples directory.

## Contributing

Feel free to contribute to this fork by submitting pull requests or opening issues for any bugs or enhancements.
