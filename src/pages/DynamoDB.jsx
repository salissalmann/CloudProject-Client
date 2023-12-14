import React from 'react'
import { useState } from 'react'
import Navigation from '../Components/Navigation'
import { REACT_APP_API_URL } from '../../meta'
import axios from 'axios'
import { notification } from 'antd'

export default function DynamoDB() {

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [DynamoDBData, setDynamoDBData] = useState([])

    const [FormData, setFormData] = useState({
        "username": "",
        "firstname": "",
        "lastname": "",
        "email": "",
        "phonenumber": "",
        "city": ""
    })

    const HandleForm = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const Submit = async () => {
        setButtonDisabled(true)
        const res = await axios.post(`${REACT_APP_API_URL}/addDataToDynamoDB`, FormData)
        if (res.data.status) {
            notification.success({
                message: 'Success',
                description: 'Data Added to DynamoDB Successfully',
                placement: 'topRight'
            })
            GetDynamoDBData()
        }
        setButtonDisabled(false)
    }

    const GetDynamoDBData = async () => {
        const res = await axios.get(`${REACT_APP_API_URL}/getDataFromDynamoDB`)
        if (res.data) {
            setDynamoDBData(res.data.Items)
        }
    }

    React.useEffect(() => {
        GetDynamoDBData()
    }, [])



    return (
        <div>
            <div className='bg-black'>
                <Navigation />

                <div className='flex items-center flex-col justify-center mt-10'>
                    <div className='flex flex-col justify-center'>
                        <div className='flex mt-4 flex-col gap-2 justify-between items-center'>
                            <button type="file"
                                onClick={() => {
                                    setOpenForm(true)
                                }}
                                disabled={buttonDisabled}
                                className="inline-flex items-center border b-1 border-rose-500  py-2 px-5 focus:outline-none bg-rose-500 hover:bg-rose-600 rounded text-sm text-white mt-4 md:mt-0">Add Data To DynamoDB</button>
                        </div>
                    </div>
                </div>
            </div>

            {openForm &&
                <section className="py-16">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-black dark:border-gray-900">
                            <div className="pb-6 border-b border-gray-100 dark:border-gray-700 ">
                                <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                                    Basic Info
                                </h2>
                                <p className="text-xs font-medium text-gray-500">
                                </p>
                            </div>
                            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-full md:w-9/12">
                                    <div className="flex flex-wrap -m-3">
                                        <div className="w-full p-3 md:w-1/3">
                                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                Name
                                            </p>
                                        </div>
                                        <div className="w-full p-3 md:w-1/3">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="firstname"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter First Name" />
                                        </div>
                                        <div className="w-full p-3 md:w-1/3">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="lastname"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter Last Name" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-full md:w-9/12">
                                    <div className="flex flex-wrap -m-3">
                                        <div className="w-full p-3 md:w-1/3">
                                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                Email address
                                            </p>
                                        </div>
                                        <div className="w-full p-3 md:flex-1">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="email"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter Email" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-full md:w-9/12">
                                    <div className="flex flex-wrap -m-3">
                                        <div className="w-full p-3 md:w-1/3">
                                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                Username
                                            </p>
                                        </div>
                                        <div className="w-full p-3 md:flex-1">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="username"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter Username" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-full md:w-9/12">
                                    <div className="flex flex-wrap -m-3">
                                        <div className="w-full p-3 md:w-1/3">
                                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                Phone Number
                                            </p>
                                        </div>
                                        <div className="w-full p-3 md:flex-1">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="phonenumber"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter Phone Number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-full md:w-9/12">
                                    <div className="flex flex-wrap -m-3">
                                        <div className="w-full p-3 md:w-1/3">
                                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                City
                                            </p>
                                        </div>
                                        <div className="w-full p-3 md:flex-1">
                                            <input
                                                className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                name="city"
                                                onChange={HandleForm}
                                                type="text" placeholder="Enter City" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex pt-6 flex-wrap -m-1.5">
                                <div className="w-full md:w-auto p-1.5">
                                    <button
                                        className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700 hover:border-gray-300 "
                                        onClick={() => {
                                            setOpenForm(false)
                                        }}
                                    >
                                        <p>Cancel</p>
                                    </button>
                                </div>
                                <div className="w-full md:w-auto p-1.5">
                                    <button
                                        className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 "
                                        onClick={Submit}
                                    >
                                        <p>Save</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            <section className="items-center mt-5 font-poppins">
                <div className="justify-center flex-1 max-w-6xl mx-auto">
                    <div className="overflow-x-auto bg-black border border-gray-500 rounded shadow ">
                        <div className="">
                            <h2
                                className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                                DynamoDB Data
                            </h2>
                            <table className="w-full table-auto">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                                        <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">
                                            <span>No.</span>
                                        </th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">Username</th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">First Name</th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">Last Name</th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">Email</th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">Phone Number</th>
                                        <th className="px-6 py-3 font-medium dark:text-gray-400">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DynamoDBData && DynamoDBData.map((item, index) => {
                                        return (
                                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                                <td className="flex items-center px-6 py-3 text-sm font-medium dark:text-gray-400 ">
                                                    <span>{index + 1}</span>
                                                </td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.id}</td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.firstname}</td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.lastname}</td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.email}</td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.phonenumber}</td>
                                                <td className="px-6 text-sm font-medium dark:text-gray-400">{item?.city}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="flex flex-wrap items-center justify-between px-6 py-3">
                                <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">Showing 1 to 10 of 13 entries</p>
                                <nav aria-label="page-navigation ">
                                    <ul className="flex mb-4 list-style-none lg:mb-0">
                                        <li className="page-item disabled ">
                                            <a href="#"
                                                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md pointer-events-none dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600">Previous
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a href="#"
                                                className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700">1
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a href="#"
                                                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">2
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a href="#"
                                                className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">3
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a href="#"
                                                className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
