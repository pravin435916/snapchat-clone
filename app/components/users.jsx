'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get("/api/chat/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message || "An error occurred while fetching users."); // Set a user-friendly error message
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <li>Loading users...</li>
      ) : error ? (
        <li>Error: {error}</li>
      ) : (
        users.map((user, i) => (
          <>
          <Link href={`/chat/${user._id}`}>
            <div className="flex gap-2 items-center p-2 hover:bg-yellow-400 rounded-2xl" key={i} >
              <Avatar>
                <AvatarImage src={`${user.photo || "https://github.com/shadcn.png"} `} alt="@shadcn" />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span >{user.username}</span>
                <div className="flex items-center gap-2 text-sm">
                <span><MdCheckBoxOutlineBlank  className="text-pink-500"/></span>
                <span> sent - 22 Apr</span>
                </div>
              </div>
            </div>
            </Link>
            <hr />
          </>
        ))
      )}
    </div>
  );
}

export default Users;
