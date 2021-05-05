import { createWriteStream } from 'fs'
import { createCipheriv, scrypt } from 'crypto'

scrypt('unknown', 'salt', 24, (err, key) => {
  if (err) throw err

  const iv = Buffer.alloc(16, 0)

  process.stdin
    .pipe(createCipheriv('aes-192-cbc', key, iv))
    .setEncoding('hex')
    .pipe(createWriteStream('unreadable.txt'))
})

