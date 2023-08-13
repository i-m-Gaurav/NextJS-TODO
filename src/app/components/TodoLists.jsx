
import Link from 'next/link'
import React from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

const getTopics = async()=>{
    try {
        const res = await fetch('http://localhost:3000/api/topics',{
            cache: "no-store",
        });
        if(!res.ok){
            throw new Error("failed to fetch topics");
        }
        return res.json();
    } catch (error) {
        console.log("Error loading topics",error);
    }
}
const TodoLists = async() => {
    
    const {topics} = await getTopics();

    return (
        <div className='grid grid-cols-1 gap-4 '>
          {topics.map((t) => (
            <div key={t.id} className='p-4 border border-slate-300 flex justify-between gap-5 items-start'>
              <div className='w-96'> {/* Adjust width using w-3/4 class */}
                <h2 className='font-bold text-2xl'>{t.title}</h2>
                <div>{t.description}</div>
              </div>
              <div className='flex gap-2'>
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  
                    <HiPencilAlt size={24} />
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
    export default TodoLists;