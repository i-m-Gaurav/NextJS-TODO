"use client"
import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import RemoveBtn from './RemoveBtn'

const TodoLists = () => {
  const [topics, setTopics] = useState([]);
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
      } catch (error) {
        console.log('Error loading topics', error);
      }
    };

    fetchTopics();
  }, [topics]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-lg'>
      {topics.map((t) => (
        <div key={t.id} className='p-4 border border-slate-300 flex flex-col justify-between gap-5 items-start w-full'>
          <div className='w-full mb-4'>
            <h2 className='font-bold text-xl md:text-2xl'>{t.title}</h2>
            <div className='mt-2'>{t.description}</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
            <RemoveBtn id={t._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;