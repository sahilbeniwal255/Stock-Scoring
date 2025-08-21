// server.js
import express from 'express';
import axios from 'axios';
import yahooFinance from 'yahoo-finance2';

const app = express();
const PORT = 3001;
import cors from 'cors';
app.use(cors());


app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stock/sector/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=kLoIqjxxlDfiTu0WcoWeIEt7D4oL0O76`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Sector fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch sector data' });
  }
});

app.get('/api/stock/dcf/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/stable/discounted-cash-flow?symbol=${symbol}&apikey=s16owBIvqowKql9y4K8jbzahkoO6MbJU`
    );

    const dcfData = response.data?.[0];

    if (!dcfData || !dcfData.dcf) {
      return res.status(404).json({ error: 'DCF data not found for symbol' });
    }

    res.json({ dcf: dcfData.dcf });
  } catch (error) {
    console.error(`DCF fetch error for ${symbol}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch DCF data' });
  }
});


app.get('/api/stock/news/:company', async (req, res) => {
  const company = req.params.company;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${company}&from=2025-07-21&sortBy=publishedAt&apiKey=b5535cd0dca747ec92412b310b5a2125`);
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    console.log(error)
  }
  
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
