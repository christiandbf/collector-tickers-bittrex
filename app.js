const fs = require('fs')
const ccxt = require('ccxt')

console.log('Initializing collector')

const INTERVAL = process.argv[2] || 1

console.log('Interval in minutes:', INTERVAL)

if (!fs.existsSync('./tickers')) {
  console.log('Creating tickers folder')
  fs.mkdirSync('./tickers')
}

const bittrex = new ccxt.bittrex()

let saveTickers = () => {
  console.log('Requesting tickers')
  bittrex.fetchTickers()
    .then(tickers => {
      console.log('Tickers received')
      let json = JSON.stringify(tickers, null, 2)
      let date = new Date().toLocaleString().replace(/:/g, '-')
      fs.writeFile('./tickers/' + date + '.json', json, (error) => {
        error
          ? console.log(error)
          : console.log('Tickers saved in the file:', date)
      })
    })
    .catch(error => console.log(error))
}

setInterval(saveTickers, (INTERVAL * 1000 * 60))
