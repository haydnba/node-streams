

// Non-flowing pull mode

process.stdin.on('readable', () => {
  let chunk

  while ((chunk = process.stdin.read()) !== null) {
    console.log(`${chunk.length} bytes: "${chunk.toString()}"`)
  }
}).on('end', () => console.log('End of stream'))


// Flowing push mode

process.stdin.on('data', (chunk) => {
  console.log(`${chunk.length} bytes: "${chunk.toString()}"`)
}).on('end', () => console.log('End of stream'))


// Async iterator

(async () => {
  for await (const chunk of process.stdin) {
    console.log(`${chunk.length}: ${chunk}`)
  }
})()
