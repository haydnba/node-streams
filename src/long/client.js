import * as http from 'http'

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
}

const req = http.request(options, res => { 
  console.log(`Server response: ${res.statusCode}`)

  void async function () {
    for await (const chunk of res) {
      process.stdout.write(chunk)
    }
  }()
})

req.end()
