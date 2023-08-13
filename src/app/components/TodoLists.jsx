"use client"
import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import RemoveBtn from './RemoveBtn'

const TodoLists = () => {
  const [topics, setTopics] = useState([]);\
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/topics`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await res.json();
        setTopics(data.topics);
        if(res.ok){
          router.refresh();
        }
      } catch (error) {
        console.log('Error loading topics', error);
      }
    };

    fetchTopics();
  }, []);

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
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;