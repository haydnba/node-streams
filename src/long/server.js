import { createServer } from 'http'
import Chance from 'chance'

let batch = 0
const chance = new Chance()

createServer(async (req, res) => {

  res.writeHead(200, { 'Content-Type': 'text/plain' })

  const pulse = setInterval(() => {
    console.log(`Writing batch ${++batch}`)

    res.write(chance.string({
      length: chance.integer({ min: 1, max: 100 })
    }))
  }, 1000)
  
  await new Promise(resolve => {
    setTimeout(resolve, 20000)
  })

  clearInterval(pulse)

  res.end()
}).listen(3000, () => console.log('Listening on http://localhost:3000'))