'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { FetchMessages, SendSnapMessage } from '@/models/serverActions'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

function ChatPage({ userProfile }) {
    const [text,setText] = useState('');
    const [messages, setMessages] = useState([]);
    const params = useParams();
    const receiverId = params.id;
    const { data : session} = useSession('');
    const senderId = session?.user._id;
    useEffect(() => {
        const getMessages = async () => {
            try {
                const fetchedMessages = await FetchMessages(senderId, receiverId);
                setMessages(fetchedMessages);
            } catch (error) {
                console.log(error);
            }
        };

        getMessages();
    }, [senderId, receiverId]);

    const MessageHandler = async (e) => {
        e.preventDefault();
        try {
            const newMessage = await SendSnapMessage(text,senderId,receiverId,"text");
            setMessages([...messages, newMessage]);
            setText('')
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }
    return (
        <div className='w-full m-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage src={`${userProfile.photo || "https://github.com/shadcn.png"} `} alt="@shadcn" />
                        <AvatarFallback>{userProfile.fullName}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-xl'>{userProfile.fullName}</span>
                        <span className='text-xs'>@{userProfile.username}</span>
                    </div>
                </div>
                <Button>Clear Chat</Button>
            </div>
            {/* chatscreeen */}
            <div className='w-full h-[82vh] border-4 rounded-lg'>
            <div className='w-full h-[82vh] border-4 rounded-lg overflow-y-auto p-4'>
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.senderId === senderId ? 'justify-start' : 'justify-start'} mb-4`}>
                        <div className={`p-2 rounded-lg ${message.senderId === senderId ? 'border-r-2 border-pink-500 bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {/* input */}
            <div className='w-full flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 "><AiOutlineCamera  className='text-2xl'/></div>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='w-[60vw] rounded-full p-2 outline-none border' placeholder='enter message'/>
                </div>
                <div className='flex gap-2 items-center'>
                <button className='px-4 py-2 bg-black text-white rounded-full' onClick={MessageHandler}>Send Snap</button>
                <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 "><AiOutlineCamera  className='text-2xl'/></div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage