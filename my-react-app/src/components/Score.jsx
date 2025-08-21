import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FinContext } from '../FinContext';

const Score = () => {
  const { companyData, company } = useContext(FinContext);

  const allSector = {
    Technology: ["AAPL", "MSFT", "GOOGL", "INTC", "AMD", "NVDA"],
    Healthcare: ["AMGN", "GILD", "VRTX", "BIIB", "REGN"],
    ConsumerServices: ["CMCSA", "NFLX", "SIRI", "ROKU"],
    Finance: ["SCHW", "PYPL", "INTU", "FITB"],
    Industrials: ["CTAS", "FAST", "ODFL", "CHRW"],
    ConsumerGoods: ["TSLA", "PEP", "MNST", "KDP"],
    Utilities: ["SRE", "NEE", "EXC"],
    Telecommunications: ["TMUS", "CHTR"],
    Energy: ["FANG", "OVV", "CTRA"],
    RealEstate: ["EQIX", "AMT", "SBAC"]
  };

  const [sector, setSector] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [maxEPS, setMaxEPS] = useState(0);
  const [minEPS, setMinEPS] = useState(Number.MAX_SAFE_INTEGER);
  const [normalizedEPS, setNormalizedEPS] = useState(0);
  const [peArray, setPEArray] = useState([]);
  const [maxPE, setMaxPE] = useState(0);
  const [minPE, setMinPE] = useState(Number.MAX_SAFE_INTEGER);
  const [medianPE, setMedianPE] = useState(0);
  const [normalizedPE, setNormalizedPE] = useState(0);
  const [dcf, setDCF] = useState(0);

  const fetchSector = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/stock/sector/${company}`);
      const sectorName = res.data?.[0]?.sector;
      if (sectorName) setSector(sectorName);
    } catch (error) {
      console.error('Error fetching sector:', error.message);
    }
  };

  const fetchDCF = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/stock/dcf/${company}`);
      const dcfValue = res.data?.dcf;
      if (typeof dcfValue === 'number') setDCF(dcfValue);
    } catch (error) {
      console.error('Error fetching DCF:', error.message);
    }
  };

  const fetchingIndustryData = async () => {
    if (!Array.isArray(symbols) || symbols.length === 0) return;

    const tempPEArray = [];
    let localMaxEPS = 0;
    let localMinEPS = Number.MAX_SAFE_INTEGER;
    let localMaxPE = 0;
    let localMinPE = Number.MAX_SAFE_INTEGER;

    for (const symbol of symbols) {
      try {
        const res = await axios.get(`http://localhost:3001/api/stock/${symbol}`);
        const { epsCurrentYear: eps, regularMarketPrice: price } = res.data;

        if (typeof eps === 'number' && typeof price === 'number' && eps !== 0) {
          const pe = price / eps;
          tempPEArray.push(pe);
          localMaxEPS = Math.max(localMaxEPS, eps);
          localMinEPS = Math.min(localMinEPS, eps);
          localMaxPE = Math.max(localMaxPE, pe);
          localMinPE = Math.min(localMinPE, pe);
        }
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error.message);
      }
    }

    if (tempPEArray.length > 0) {
      tempPEArray.sort((a, b) => a - b);
      const mid = Math.floor(tempPEArray.length / 2);
      const median = tempPEArray.length % 2 === 0
        ? (tempPEArray[mid - 1] + tempPEArray[mid]) / 2
        : tempPEArray[mid];

      setPEArray(tempPEArray);
      setMaxEPS(localMaxEPS);
      setMinEPS(localMinEPS);
      setMaxPE(localMaxPE);
      setMinPE(localMinPE);
      setMedianPE(median);
    }
  };

  const normalizedData = () => {
    if (!companyData?.epsCurrentYear || !companyData?.regularMarketPrice) return;

    const epsRange = maxEPS - minEPS;
    const peRange = maxPE - minPE;
    const cpe = companyData.regularMarketPrice / companyData.epsCurrentYear;

    setNormalizedEPS(epsRange === 0 ? 0 : (companyData.epsCurrentYear - minEPS) / epsRange);
    setNormalizedPE(peRange === 0 ? 0 : (cpe - medianPE) / peRange);
  };

  useEffect(() => {
    if (company) {
      fetchSector();
      fetchDCF();
    }
  }, [company]);

  useEffect(() => {
    if (sector && allSector[sector]) {
      setSymbols(allSector[sector]);
    }
  }, [sector]);

  useEffect(() => {
    if (symbols.length > 0) {
      fetchingIndustryData();
    }
  }, [symbols]);

  useEffect(() => {
    const ready =
      maxEPS > 0 &&
      minEPS < Number.MAX_SAFE_INTEGER &&
      maxPE > 0 &&
      minPE < Number.MAX_SAFE_INTEGER &&
      medianPE > 0;

    if (ready) {
      normalizedData();
    }
  }, [maxEPS, minEPS, maxPE, minPE, medianPE, companyData]);

  return (
    <div>
      <div>
        
      </div>
      <table className="table-fixed border-collapse text-sm text-yellow-300 bg-blue-950 m-5">
        <thead className="bg-blue-900 sticky top-0">
          <tr>
            <th className="px-4 py-2 border border-yellow-300 text-left font-semibold">Metric</th>
            <th className="px-4 py-2 border border-yellow-300 text-left font-semibold">Value</th>
            <th className="px-4 py-2 border border-yellow-300 text-left font-semibold">Weight</th>
            <th className="px-4 py-2 border border-yellow-300 text-left font-semibold">Contribution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border border-yellow-300 font-medium">Normalized PE</td>
            <td className="px-4 py-2 border border-yellow-300">{normalizedPE.toFixed(4)}</td>
            <td className="px-4 py-2 border border-yellow-300">20</td>
            <td className="px-4 py-2 border border-yellow-300">{(normalizedPE * 20).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-yellow-300 font-medium">Normalized EPS</td>
            <td className="px-4 py-2 border border-yellow-300">{normalizedEPS.toFixed(4)}</td>
            <td className="px-4 py-2 border border-yellow-300">20</td>
            <td className="px-4 py-2 border border-yellow-300">{(normalizedEPS * 20).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-yellow-300 font-medium">Normalized DCF</td>
            <td className="px-4 py-2 border border-yellow-300">
              {dcf !== 0 && companyData
                ? (Math.min(dcf / companyData.regularMarketPrice, 2) / 2).toFixed(4)
                : 'Loading...'}
            </td>
            <td className="px-4 py-2 border border-yellow-300">20</td>
            <td className="px-4 py-2 border border-yellow-300">
              {dcf !== 0 && companyData
                ? (Math.min(dcf / companyData.regularMarketPrice, 2) / 2 * 20).toFixed(2)
                : 'Loading...'}
            </td>
          </tr>
          <tr className="bg-blue-900 font-semibold">
            <td className="px-4 py-2 border border-yellow-300" colSpan={3}>Total Score</td>
            <td className="px-4 py-2 border border-yellow-300">
              {(
                normalizedPE * 20 +
                normalizedEPS * 20 +
                (dcf !== 0 && companyData
                  ? Math.min(dcf / companyData.regularMarketPrice, 2) / 2 * 20
                  : 0)
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Score;
