import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [specialChr, setSpecialChr] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passGen = useCallback(()=>{
    let pass= ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789";
    if(specialChr) str += "!@#$%^&*()_{}[]/<>?"

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, specialChr, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passGen()
  }, [length, number, specialChr, passGen])
  return (
    <div className='w-full h-screen bg-black flex justify-center text-white p-10'>
      <div className="h-fit bg-zinc-800 rounded-lg px-3 py-5 ">
        <div className='w-auto flex mb-3  bg-blue-500 rounded-full '>
          <input type="text"
          className='w-full rounded-l-full outline-none border text-blue-500 font-semibold px-3 py-2' 
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}/>
          <button onClick={copyPassword}
          className='px-3 py-1 outline-none font-sans rounded-r-full bg-blue-500 text-white hover:bg-blue-700'>
            Copy
          </button>
        </div>
        <div className="text-sm flex gap-5">
          <div className="flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            className='outline-none w-20 cursor-pointer'/>
            <label className='text-blue-500'>Length <span className='text-blue-400'>{length}</span></label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultValue={number}
            id='numberInput'
            onChange={()=>{
              setNumber((prev)=>!prev);
            }}/>
            <label htmlFor='numberInput' className='text-blue-500'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultValue={specialChr}
            id='CharInput'
            onChange={()=>{
              setSpecialChr((prev)=>!prev);
            }}/>
            <label htmlFor='CharInput' className='text-blue-500'>Charecters</label>
          </div>
        </div>
        <button
          onClick={()=>passGen()}
        className='w-full h-10 mt-5 bg-blue-500 rounded-full font-semibold text-xl hover:bg-blue-700'>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default App