import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Navigation() {
    const navigate = useNavigate()
    return (
        <div className='bg-black'>
            <header className="text-white body-font">
                <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-between">
                    <a className="flex title-font font-medium items-center text-gray-300 mb-4 md:mb-0">
                        <img src='/vite.svg' className='hidden md:block cursor-pointer' width={50} height={50} alt="Logo" />
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base font-nunito justify-center">
                        <a className="mr-5 hover:text-gray-300 cursor-pointer" onClick={
                            () => {
                                navigate('/')
                            }
                        }>Connect to S3 Bucket</a>
                        <a className="mr-5 hover:text-gray-300 cursor-pointer"
                            onClick={
                                () => {
                                    navigate('/dynamodb')
                                }
                            }
                        >Connect to DynamoDB</a>
                    </nav>
                    <div className='flex flex-row gap-2'>
                        <button className="inline-flex items-center border b-1 border-rose-500  py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0">Login</button>
                    </div>
                </div>
            </header>

        </div>
    )
}
