import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const ref = useRef()
    const refpassword = useRef()
    const showPassword = () => {
        if (ref.current.src.includes("Icons/eye.png")) {
            ref.current.src = "Icons/eyecross.png"
            refpassword.current.type = "text"
        }
        else if (ref.current.src.includes("Icons/eyecross.png")) {
            ref.current.src = "Icons/eye.png"
            refpassword.current.type = "password"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3 ){
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Password Not Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))
    }


    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("password", JSON.stringify(...passwordArray.filter(item => item.id != id)))
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className="md:mycontainer p-2 md:p-0 min-h-[85.5vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-800 text-lg text-center font-semibold'>Your own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-3 items-center'>
                    <input value={form.site} onChange={handlechange} className='rounded-full border border-green-600 w-full px-5 py-1' type="text" name="site" id="site" placeholder='Enter Website URL' />
                    <div className="flex flex-col md:flex-row w-full gap-3">
                        <input value={form.username} onChange={handlechange} className='rounded-full border border-green-600 w-full px-5 py-1' type="text" name="username" id="username" placeholder='Enter Username' />
                        <div className="relative">
                            <input ref={refpassword} value={form.password} onChange={handlechange} className='rounded-full border border-green-600 w-full px-5 py-1' type="password" name="password" id="id" placeholder='Enter Password' />
                            <span className='absolute right-[3px] top-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="Icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center w-fit bg-green-500 rounded-full px-4 py-2 gap-2 hover:bg-green-700 border border-green-950'>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#c71f16">
                        </lord-icon>
                        <span className='font-semibold'>Save Password</span>
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='text-center font-bold text-lg'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-7">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Website URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copytext(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='flex justify-evenly items-center  text-center py-2 border border-white'>
                                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                stroke="bold"
                                                state="hover-line"
                                                colors="primary:#121331,secondary:#109121"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="morph"
                                                stroke="bold"
                                                state="morph-trash-in"
                                                colors="primary:#121331,secondary:#109121"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
