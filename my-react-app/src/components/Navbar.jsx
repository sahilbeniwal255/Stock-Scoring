import React from 'react'

const Navbar = ({ mode, setMode }) => {

  return (
    <div className={`w-full m-0 p-3 font-sans flex justify-between ${mode ? 'text-white' : ''}`}>
      <h1 className={`font-bold mr-5 p-1.5`}>FINESTA</h1>
      <div className='mr-5 cursor-pointer text-sm' onClick={() => setMode(!mode)}>
        {mode ? <p className={`${mode ? 'p-1.5 rounded-xl border-2 border-white' : ''}`}>Light Mode</p> : <p className = {`p-1.5 rounded-xl border-2 border-black`}>Dark Mode</p>}
      </div>
    </div>
  )
}

export default Navbar