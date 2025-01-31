import React from 'react'

const Footer = () => {
    return (
        <div className='sticky bottom-0 flex justify-between gap-3 items-center h-10 bg-slate-800 text-white px-4'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <div className='flex gap-3 items-center'>
                Created with <img width={35} src="Icons/heart.png" alt="" /> by Shresth_Chaurasia
            </div>
        </div>
    )
}

export default Footer
