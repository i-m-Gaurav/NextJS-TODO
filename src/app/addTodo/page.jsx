"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTopic() {
  const[title, setTitle] = useState("");
  const[description, setdescription] = useState("");
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    

    if(!title || !description){
        alert("Fill the form");
        return;
    }

    try {

        const res = await fetch('http://localhost:3000/api/topics',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body :JSON.stringify({title, description}),
        });

        if(res.ok){
            router.push('/');
            router.refresh();
        }else{
            throw new Error("Failded to create new topic");
        }
        
    } catch (error) {
        console.log(error);
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex text-black flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="type text"
        />
        <input
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="descriptioin"
        />
        <button className="bg-green-600 font-bold text-white py-3 px-3 w-fit">
          Add Topic
        </button>
      </form>
    </>
  );
}
