import Chance from 'chance'
import { Readable } from 'stream'
import { createGzip } from 'zlib'
import { createWriteStream } from 'fs'
import { createCipheriv, scrypt } from 'crypto'


const chance = new Chance()

const makeObject = () => {
  return JSON.stringify({
    name: chance.name(),
    email: chance.email(),
    phone: chance.phone(),
    address: chance.address()
  })
}

const iterable = chance.n(makeObject, 10000)

// Pipe straight to stdout
// Readable.from(iterable).pipe(process.stdout)

// Encrypt, zip and write to file...
scrypt('unknown', 'salt', 24, (err, key) => {
  if (err) throw err

  const iv = Buffer.alloc(16, 0)

  Readable
    .from(iterable)
    .pipe(createCipheriv('aes-192-cbc', key, iv))
    .setEncoding('hex')
    .pipe(createGzip())
    .pipe(createWriteStream('encrypted.zip'))
    // .pipe(process.stdout)

})