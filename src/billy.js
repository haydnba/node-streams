import Chance from 'chance'
import { PassThrough, Readable } from 'stream'

const chance = new Chance()
const monitor = new PassThrough()

let written = 0

void async function () {
  for await (const chunk of monitor) {
    console.log(written += chunk.length)
  }
}()

new Readable({
  read (size) {
    this.push(chance.string({ length: size }), 'utf8')
    
    chance.bool({ likelihood: 5 }) && this.push(null)
  }
}).pipe(monitor).pipe(process.stdout)

