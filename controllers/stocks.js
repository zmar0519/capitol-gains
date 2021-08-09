import axios from "axios"

export {
  findRange,
}

let stockKey = process.env.STOCK_KEY
let stockHost = process.env.STOCK_HOST

function findRange(req, res){
  var options = {
    method: 'GET',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart',
    params: {
      period1: req.params.date1, 
      period2: req.params.date2, 
      symbol: req.params.ticker,
      interval: "1mo",
    },
    headers: {
      'x-rapidapi-key': stockKey,
      'x-rapidapi-host': stockHost
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });
}