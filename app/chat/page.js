'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useRouter } from 'next/navigation';
function page() {
  const {data : session} = useSession();
  const router = useRouter()
  // if(!session) {
  //   router.push('/login')
  // }
  return (
    <div className="snapchat-camera  bg-gray-200 mx-auto flex flex-grow justify-center items-center  mb-4 ">
          {/* <Image src={dog} width={100} height={100} className='w-full h-full object-fill'/> */}
          <div className="camera-controls flex space-x-4 justify-center mb-4 absolute">
            <button className="rounded-full bg-white p-4 focus:outline-none">
              <AiOutlineCamera className="text-2xl text-yellow-500" />
            </button>
          </div>
        </div>
  )
}

export default page