'use client'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from '../dashboard/_components/StoryItemCard'
import { Button } from '@nextui-org/button'

const ExploreMore = () => {
    const [offset, setOffset] = useState(0)
    const [storyList, setStoryList] = useState([]) // Initialize as an empty array

    useEffect(() => {
        GetAllStories(0)
    }, []) // Add dependency array to avoid repeated calls

    const GetAllStories = async (offset) => {
        try {
            setOffset(offset)
            const result = await db.select()
                .from(StoryData)
                .orderBy(desc(StoryData.id))
                .limit(8)
                .offset(offset)
            setStoryList((prev)=>[...prev,...result]) // Update storyList state
        } catch (error) {
            console.error("Error fetching stories:", error)
        }
    }

    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40'>
            <h2 className='font-bold text-4xl text-primary text-center'>Explore More Stories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
                {storyList.length > 0 ? ( // Check if storyList is not empty
                    storyList.map((item, index) => (
                        <StoryItemCard story={item} key={index} />
                    ))
                ) : (
                    <p>No stories available</p> // Display a fallback message
                )}
                
            </div>
            <div className='text-center mt-10'>
                    <Button color='primary'
                    onClick={()=>GetAllStories(offset+8)}
                    >Load More</Button>
                </div>
        </div>
    )
}

export default ExploreMore
