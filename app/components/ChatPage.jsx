'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { ClearChat, FetchMessages, SendSnapMessage } from '@/models/serverActions'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MdEmojiEmotions } from 'react-icons/md'
import CameraComponent from './CameraComponent'

function ChatPage({ userProfile }) {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [emojiPopup, setEmojiPopup] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const params = useParams();
    const receiverId = params.id;
    const { data: session } = useSession('');
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
    const handleCapture = async (imageSrc) => {
        setIsCameraOpen(false); // Close camera
    
        try {
          await axios.post("/api/send-message", {
            content: imageSrc,  // Send base64 image
            senderId: senderId,
            receiverId: receiverId,
            messageType: "image",
          });
          alert("Image sent successfully!");
        } catch (error) {
            alert("Image Failed to sent!");
          console.error("Error sending image:", error);
        }
      };
    

    const clearMessages = async () => {
        try {
            await ClearChat(senderId, receiverId);
            setMessages([]);
        } catch (error) {
            console.log(error);
        }
    };

    const MessageHandler = async (e) => {
        e.preventDefault();
        try {
            const newMessage = await SendSnapMessage(text, senderId, receiverId, "text");
            setMessages([...messages, newMessage]);
            setText('')
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }
    const handleOpenEmojiPopup = () => {
        setEmojiPopup(!emojiPopup);
    }
    const handleOpenCameraAndSendMessage = () => {
        setIsCameraOpen(true);
      };
    const emojis = [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩",
    ];
    
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
                <Button onClick={clearMessages}>Clear Chat</Button>
            </div>
            {/* chatscreeen */}
            <div className='w-full h-[80vh] border-4 rounded-lg'>
                <div className='w-full h-[80vh] border-4 rounded-lg overflow-y-auto p-4'>
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
            <div className='w-full flex justify-between items-center mt-4 relative' >
                {
                    emojiPopup &&
                    <div className="absolute bottom-24 left-24 bg-white shadow-lg rounded-lg p-2 w-60 h-48 overflow-y-auto grid grid-cols-5 gap-2 border">
                        {emojis.map((emoji, index) => (
                            <button key={index} 
                             onClick={() => {
                                setEmojiPopup(!emojiPopup);
                                setText(text + emoji);
                            }} 
                            className="text-2xl p-1 hover:bg-gray-200 rounded">
                                {emoji}
                            </button>
                        ))}
                    </div>
                }
                {isCameraOpen && <CameraComponent onCapture={handleCapture} />}
                <div className='flex gap-4 items-center'>
                    <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 cursor-pointer " onClick={handleOpenCameraAndSendMessage}><AiOutlineCamera className='text-2xl' /></div>
                    <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 cursor-pointer " onClick={handleOpenEmojiPopup}><MdEmojiEmotions className='text-2xl' /></div>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='w-[50vw] rounded-full p-2 outline-none border' placeholder='enter message' />
                </div>
                <div className='flex gap-2 items-center'>
                    <button className='px-4 py-2 bg-black text-white rounded-full' onClick={MessageHandler}>Send Snap</button>
                    <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 "><AiOutlineCamera className='text-2xl' /></div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage