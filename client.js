const fs = require('fs')
const fetch = require('node-fetch')

fs.mkdirSync('input', { recursive: true })
fs.writeFileSync('input/content.dat', "a".repeat(68000))

const requests = []
for (let i = 0; i < 100; i++) {
    console.log("uploading", i)
    let stream = fs.createReadStream('input/content.dat')
    const request = fetch('http://localhost:3000/upload', {
        method: 'PUT',
        body: stream
    })
    requests.push(request)
}

Promise.allSettled(requests).then(result => { console.log(result) })