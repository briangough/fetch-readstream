const PORT = 3000;
const http = require("http");
const fs = require("fs");
const { pipeline } = require('stream')
fs.mkdirSync('output', { recursive: true })

let counter = 0
const server = http.createServer((req, res) => {
    console.log("req", req.url)
    if (req.url === "/upload") {
        console.log("receiving file", counter)
        const output = fs.createWriteStream(`output/upload-${counter++}.txt`);
        pipeline(req, output, (err) => {
            res.writeHead(201, { "Content-Type": "text/plain" });
            res.end();
        });
    } else {
        res.writeHead(404);
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
