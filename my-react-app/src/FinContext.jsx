import { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const FinContext = createContext();

export const FinProvider = (props) => {

  const [company, setCompany] = useState("AAPL");
  const [score, setScore] = useState(0);
  const [companyData, setCompanyData] = useState(null);

  const fetchCompanyData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/stock/${company}`);
      setCompanyData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCompanyData();
  }, [company])

  const value = {
    company,
    setCompany,
    companyData,
  };

  return (
    <FinContext.Provider value={value}>
      {props.children}
    </FinContext.Provider>
  );
};

export default FinProvider;