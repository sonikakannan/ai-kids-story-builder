'use client'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from './StoryItemCard'
import CustomLoader from '@/app/create-story/_components/CustomLoader'
import Link from 'next/link'
import { Button } from '@nextui-org/button'

const UserStoryList = () => {
    const {user} =useUser()
    const[storyLsit, setStoryList] = useState()
    const[loading, setLoading] =useState(false)
    useEffect(()=>{
        user&&getUserStory()
    },[user])

    const getUserStory=async()=>{
        setLoading(true)
        const result= await db.select().from(StoryData)
        .where(eq(StoryData.userEmail,user?.primaryEmailAddress?.emailAddress??''))
        .orderBy(desc(StoryData.id))
        
        setStoryList(result)
        setLoading(false)
    }
  return (
    <div>
       <div className='flex justify-end'>
       <Link href={'/buy-credits'}>
            <Button color='secondary' className='bg-blue-400 text-white text-lg mt-2 '>Buy More Credits</Button>
            </Link>
       </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4'>
            {storyLsit&&storyLsit.map((item,index)=>(
                <StoryItemCard key={index} story={item}/>
            ))}
        </div>
        <CustomLoader isLoading={loading}/>
    </div>
  )
}

export default UserStoryList