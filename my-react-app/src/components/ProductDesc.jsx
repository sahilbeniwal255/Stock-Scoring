import React from 'react'

const ProductDesc = ({mode}) => {
  return (
    <div className={`text-wrap ml-0 w-full m-5 bg-black text-white p-5 font-mono ${mode ? 'bg-slate-900' : ''}`}>
        <h2 className="text-2xl font-bold mb-4 font-sans">📊 What the Investment Score Represents</h2>
        <ul className="ml-5 p-3 list-disc list-insidemb-6">
            <li>A weighted sum of normalized financial metrics (e.g., PE, EPS, DCF).</li>
            <li>Each metric is scaled to a common range for fair comparison.</li>
            <li>Weights reflect the importance of each metric in the final score.</li>
            <li>The score provides a quick snapshot of a company’s financial attractiveness.</li>
            <li>Useful for ranking stocks, filtering candidates, and visualizing performance.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4 mt-6 font-sans">🚫 What the Score Does Not Represent</h2>
        <ul className="p-3 list-disc list-inside mb-6">
            <li>It does not predict future returns or price movements.</li>
            <li>It excludes macro trends, technical indicators, and sentiment unless explicitly added.</li>
            <li>It is not comparable across different scoring models or dashboards.</li>
            <li>It is not static — the logic and weights can evolve over time.</li>
        </ul>
    </div>
  )
}

export default ProductDesc