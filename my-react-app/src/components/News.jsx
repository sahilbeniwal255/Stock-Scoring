import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { FinContext } from '../FinContext';

const News = ({mode}) => {

    const {companyData, company} = useContext(FinContext);
    const [articles, setArticles] = useState([]);

    const fetchNews = async () => {
        if(companyData) {
            const res = await axios.get(`http://localhost:3001/api/stock/news/${companyData.displayName}`);
            console.log(res);
            let t = [];
            for(let i = 0; i < 5; i++) {
                t[i] = res.data.articles[i];
            }
            setArticles(t);
        }
    }

    useEffect(() => {
      fetchNews();
    }, [companyData])
    

  return (
    <div className={`m-5 ${mode ? 'text-white' : ''}`}>
        <h1 className={`m-4 font-bold ${mode ? 'text-white' : ''}`}>LATEST NEWS</h1>
    {articles.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm">
            <thead className={`${mode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} uppercase tracking-wider`}>
            <tr>
                <th className="px-4 py-3 text-left border-b border-gray-600">Title</th>
                <th className="px-4 py-3 text-left border-b border-gray-600">Description</th>
                <th className="px-4 py-3 text-left border-b border-gray-600">Link</th>
            </tr>
            </thead>
            <tbody>
            {articles.map((article, idx) => (
                <tr key={idx} className={`${mode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} border-b border-gray-700`}>
                <td className="px-4 py-3 font-medium">{article.title}</td>
                <td className="px-4 py-3">{article.description}</td>
                <td className="px-4 py-3">
                    <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                    >
                    Read more
                    </a>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    ) : (
        <p className="text-center text-sm italic">Loading latest news...</p>
    )}
    </div>

    );
}

export default News