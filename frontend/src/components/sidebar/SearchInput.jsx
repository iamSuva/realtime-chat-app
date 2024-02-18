import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
function SearchInput() {
  const [search, setSearch] = useState("");
  const {conversations}=useGetConversation();
  const {setSelectedConversation}=useConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search)
    return;
   if(search.length<3)
   return toast.error("Search term must be at least 3 characters lenth");
  const conversation=conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLocaleLowerCase())); //check lowecase of each user name has a substring seachinput
   if(conversation)
   {
    setSelectedConversation(conversation);
   }else
   {
    return toast.error("No such user found");
   }
  }

  return (
    <form className="flex items-center gap-2"
    onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="input input-bordered rounded-full p-2"
      />
      <button type="submut" className="btn btn-circle text-white bg-sky-300">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
