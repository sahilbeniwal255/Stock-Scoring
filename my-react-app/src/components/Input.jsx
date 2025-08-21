import React from 'react'
import { useState, useContext } from 'react';
import { FinContext } from '../FinContext';

const Input = ({mode}) => {
  const [val, setVal] = useState("");
  const {company, setCompany} = useContext(FinContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCompany(val);
  }

  return (
    <form onSubmit={onSubmitHandler} className='w-full flex gap-0 m-5 items-center justify-center'>
        <input value = {val} placeholder='Enter company code here' onChange={(e) => {setVal(e.target.value)}} type = "text" className={`p-1 pl-2 pr-2 border-2 border-black ${mode ? 'text-white bg-black border-1 border-white' : ''}`}/>
        <button type = 'submit' className={`border-black border-2 p-1 pl-6 pr-6 bg-black font-semibold text-white font-sans ${mode ? 'border-white border-1 bg-black text-white' : ''}`}>SCORE</button>
    </form>
  )
}

export default Input