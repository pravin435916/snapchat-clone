import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  const {data : session} = useSession('')
  console.log(session)
  return (
    <div className='bg-yellow-400 flex w-full h-[90vh] gap-20 items-center justify-center'>
      <div className='w-[30%] flex flex-col gap-2'>
        <span className='text-5xl font-bold'>Snapchat is Now on the web</span>
        {
          session ? 
          <Link href={'/chat'}><Button className="rounded-lg">start chat</Button></Link>
          :
          <Link href={'/login'}><Button className="rounded-lg">Login to chat</Button></Link>
        }
      </div>
      <div className=''>
        <Image src='/assets/child.png' width={300} height={300} className='w-full h-full' />
      </div>
    </div>
  )
}

export default Home