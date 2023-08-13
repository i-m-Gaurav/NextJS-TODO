
"use client"
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const RemoveBtn = ({id}) => { 
    const router = useRouter();

    const RemoveTopic = async ()=>{
        const confirmed = confirm("Are you sure?");
        if(confirmed){
            const res =await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/topics?id=${id}`,{
                method:"DELETE",
            });
            if(res.ok){
                router.refresh();
            }

        }
        
    };
  return (
    <>
    <button onClick={RemoveTopic} className='text-red-400'>
        <HiOutlineTrash size={24}/>
    </button>
    </>
  )
}

export default RemoveBtn