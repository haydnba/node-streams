import Chance from 'chance'
import { Readable } from 'stream'

const chance = new Chance()
const iterable = chance.n(chance.email, chance.integer({ min: 1, max: 50 }))

Readable.from(iterable).pipe(process.stdout)