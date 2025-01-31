import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white sticky top-0'>
            <div className="mycontainer flex justify-between px-4 h-12 items-center py-5">
                <div className="logo font-bold text-2xl">       
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>   
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold hover:cursor-pointer duration-300 ease-out hover:transition-all' href="/">Home</a>
                        <a className='hover:font-bold hover:cursor-pointer duration-300 ease-out hover:transition-all' href="#">About</a>
                        <a className='hover:font-bold hover:cursor-pointer duration-300 ease-out hover:transition-all' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-green-800 flex items-center gap-3 px-4 py-1 rounded-full outline outline-white'>
                    <img className='invert w-7' src="/Icons/github.svg" alt="" />
                    <span className='font-bold'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
