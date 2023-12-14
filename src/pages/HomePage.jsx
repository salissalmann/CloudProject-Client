import React from 'react'
import Navigation from '../Components/Navigation'
import { REACT_APP_API_URL } from '../../meta'
import axios from 'axios'
import { notification } from 'antd'

export default function HomePage() {

    const [ImagesFromS3, setImagesFromS3] = React.useState([])

    const [file, setFile] = React.useState(null)
    const [base64, setBase64] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [ImageLink, setImageLink] = React.useState("")

    const HandleImage = (e) => {
        setFile(e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setBase64(reader.result)
        }
        if (e.target.files[0]) {
            UploadImageToS3(e.target.files[0].name)
        }
    }

    const UploadImageToS3 = async (name) => {
        setButtonDisabled(true)
        name = name.replace(/\s/g, '-')
        const res = await axios.post(`${REACT_APP_API_URL}/addImageToS3Bucket`, { imageFile: base64, fileName: name })
        if (res.data.status) {
            notification.success({
                message: 'Success',
                description: 'Image Uploaded to S3 Bucket Successfully',
                placement: 'topRight'
            })
            setImageLink(res.data.data.Location)
            GetS3Images()
        }

        setButtonDisabled(false)
    }

    const GetS3Images = async () => {
        const res = await axios.get(`${REACT_APP_API_URL}/getImagesLinksFromS3Bucket`)
        if (res.data) {
            setImagesFromS3(res.data)
        }
    }

    React.useEffect(() => {
        GetS3Images()
    }, [])



    return (
        <div className='bg-black'>
            <Navigation />

            <div className='flex items-center flex-col justify-center mt-10'>
                <div className='flex flex-col justify-center'>
                    <div className='flex mt-4 flex-col gap-2 justify-between items-center'>
                        <input type="file" onChange={HandleImage} id="upload" hidden
                            accept="image/png"
                        />
                        <button type="file"
                            onClick={() => {
                                document.getElementById('upload').click()
                            }}
                            disabled={buttonDisabled}
                            className="inline-flex items-center border b-1 border-rose-500  py-2 px-5 focus:outline-none bg-rose-500 hover:bg-rose-600 rounded text-sm text-white mt-4 md:mt-0">Upload Image to S3 Bucket</button>
                        {base64 &&
                            <img src={base64} width={200} height={200} alt="Image" />}
                    </div>
                </div>

                {ImageLink !== "" &&
                    <div className={`w-4/5
                                        mt-5
                                        text-sm
                                        text-white 
                                        mx-auto
                                        flex flex-row
                                        font-vt323
                                        gap-4
                                        items-center
                                        justify-between
                                        border
                                        border-white
                                        p-4`}
                    >
                        <div>Access your New Image: </div>
                        <div className='
                                        flex
                                        flex-row
                                        gap-4
                                        items-center
                                        justify-between
                                        '>
                            {ImageLink}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                onClick={() => {
                                    window.open(`${ImageLink}`, "_blank")
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                        </div>
                    </div>
                }

                <div className='flex flex-col justify-center text-white mt-5'>
                    <h1>Images From Your S3 Bucket</h1>
                </div>                

                <div className='flex flex-col justify-center'>
                    {ImagesFromS3.length > 0 &&
                        <div className=''>
                                    {ImagesFromS3.map((image, index) => {
                                        return (
                                            <div className={`w-4/5
                                                mt-5
                                                text-sm
                                                text-white 
                                                mx-auto
                                                flex flex-row
                                                font-vt323
                                                gap-4
                                                items-center
                                                justify-between
                                                border
                                                border-white
                                                p-4`}
                                                key={index}
                                            >
                                                <div>Access your Image: </div>
                                                <div className='
                                                flex
                                                flex-row
                                                gap-4
                                                items-center
                                                justify-between
                                                '>
                                                    {image}
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                                        onClick={() => {
                                                            window.open(`${image}`, "_blank")
                                                        }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })}
                        </div>
                    }
                </div>
                {/*Loading*/}
                {ImagesFromS3.length === 0 &&
                    <div className='flex flex-col justify-center text-white mt-5'>
                        <h1>Loading...</h1>
                    </div>
                }
            </div>
        </div>
    )
}
