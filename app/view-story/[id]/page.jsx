'use client';

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const ViewStory = ({ params: initialParams }) => {
  const [story, setStory] = useState(null); // Set default to null
  const bookRef = useRef();
  const [count, setCount] = useState(0); // Initial page count set to 0

  const getStory = async (storyId) => {
    try {
      const result = await db
        .select()
        .from(StoryData)
        .where(eq(StoryData.storyId, storyId));
      if (result.length > 0) {
        setStory(result[0]); // Set story data if found
      } else {
        setStory(null); // No story found, set to null
      }
    } catch (error) {
      console.error("Error fetching story:", error);
      setStory(null); // In case of error, set story to null
    }
  };

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await initialParams; // Resolve params if they are a promise
      if (resolvedParams?.id) {
       
        getStory(resolvedParams.id);
      } else {
        console.error("Story ID not found in params.");
      }
    };

    fetchParams();
  }, [initialParams]);

 

  if (story === null) {
    // Show "No story available" message if no story found
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl text-center text-red-600">No story available.</h2>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-40 flex flex-col min-h-screen py-5">
      <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
        {story?.output?.title || "Loading..."}
      </h2>
      <div className="relative">
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          useMouseEvents={false}
          className="mt-10 flex items-center justify-center"
          ref={bookRef}
        >
          <div className=" bg-white">
            <BookCoverPage imageUrl={story?.coverImage} />
          </div>
          {
            [...Array(story?.output?.chapters?.length)].map((item, index) => (
              <div key={index} className="bg-white p-10 border">
                <StoryPages storyChapter={story?.output?.chapters[index]} />
              </div>
            ))
          }
        </HTMLFlipBook>

        {/* Previous page button */}
        {count > 0 && (
          <div
            className="absolute -left-5 top-[250px]"
            onClick={() => {
              if (bookRef.current) {
                bookRef.current.pageFlip().flipPrev();
                setCount(count - 1);
              }
            }}
          >
            <FaRegArrowAltCircleLeft className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
        
        {/* Next page button */}
        {count < (story?.output?.chapters?.length - 1) && (
          <div
            className="absolute -right-5 top-[250px]"
            onClick={() => {
              if (bookRef.current) {
                bookRef.current.pageFlip().flipNext();
                setCount(count + 1); // Corrected the typo here
              }
            }}
          >
            <FaRegArrowAltCircleRight className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStory;
