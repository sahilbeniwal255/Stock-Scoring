import React, { useContext, useState, useEffect } from 'react'
import { FinContext } from '../FinContext'

const Table = () => {
  const { companyData, company } = useContext(FinContext)
  const [currEPS, setCurrEPS] = useState(-1)

  useEffect(() => {
    if (companyData) {
      setCurrEPS(companyData.epsCurrentYear)
    }
  }, [companyData])

  return (
    <div className="m-5 border-2 border-yellow-300 bg-blue-950 text-yellow-300 rounded-md">
      <div>
        <table className="min-w-full table-fixed border-collapse text-sm">
          <thead className="bg-blue-900 sticky top-0">
            <tr>
              <th
                colSpan="2"
                className="px-4 py-2 border border-yellow-300 text-left text-yellow-300 font-semibold"
              >
                {company} Key Financial Metrics
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Company Name</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.longName : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Display Name</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.displayName : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Market Price</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.regularMarketPrice : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Market Cap</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? `$${companyData.marketCap}` : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">EPS (Current Year)</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.epsCurrentYear : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Forward PE</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.forwardPE : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Trailing PE</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.trailingPE : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Dividend Yield</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.dividendYield : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Dividend Rate</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.dividendRate : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Book Value</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.bookValue : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Price to Book</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? companyData.priceToBook : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-yellow-300 font-medium">Exchange</td>
              <td className="px-4 py-2 border border-yellow-300">
                {companyData ? `${companyData.exchange}(${companyData.fullExchangeName})` : 'Loading...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
