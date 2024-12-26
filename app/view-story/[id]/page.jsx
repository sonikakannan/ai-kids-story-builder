'use client';

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import CustomLoader from '@/app/create-story/_components/CustomLoader';

const ViewStory = ({ params: initialParams }) => {
  const [story, setStory] = useState(null);
  const bookRef = useRef();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  

  const getStory = async (storyId) => {
    try {
      const result = await db
        .select()
        .from(StoryData)
        .where(eq(StoryData.storyId, storyId));
      if (result.length > 0) {
        setStory(result[0]);
      } else {
        setStory(null);
      }
    } catch (error) {
      console.error("Error fetching story:", error);
      setStory(null);
    }
  };

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await initialParams;
      if (resolvedParams?.id) {
        getStory(resolvedParams.id);
      } else {
        console.error("Story ID not found in params.");
      }
    };

    fetchParams();
  }, [initialParams]);

  if (story === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl text-center text-red-600">No story available.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-10 lg:px-20 flex flex-col min-h-screen py-5">
      <h2 className="font-bold text-2xl md:text-4xl text-center p-5 bg-primary text-white">
        {story?.output?.title || "Loading..."}
      </h2>
      <div className="relative flex ">
        <HTMLFlipBook
          width={window.innerWidth < 768 ? 280 : 500} // Adjust width based on screen size
          height={window.innerWidth < 768 ? 400 : 500} // Adjust height for smaller screens
          showCover={true}
          useMouseEvents={false}
          ref={bookRef}
          className="lg:mt-5"
        >
          <div className="bg-white ">
            <BookCoverPage imageUrl={story?.coverImage} />
          </div>
          {[...Array(story?.output?.chapters?.length)].map((_, index) => (
            <div key={index} className="bg-white p-5 border">
              <StoryPages storyChapter={story?.output?.chapters[index]} />
            </div>
          ))}
        </HTMLFlipBook>

        {/* Previous page button */}
        {count > 0 && (
          <div
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={() => {
              if (bookRef.current) {
                bookRef.current.pageFlip().flipPrev();
                setCount(count - 1);
              }
            }}
          >
            <FaRegArrowAltCircleLeft className="text-[30px] md:text-[40px] text-primary cursor-pointer" />
          </div>
        )}

        {/* Next page button */}
        {count < (story?.output?.chapters?.length - 1) && (
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => {
              if (bookRef.current) {
                bookRef.current.pageFlip().flipNext();
                setCount(count + 1);
              }
            }}
          >
            <FaRegArrowAltCircleRight className="text-[30px] md:text-[40px] text-primary cursor-pointer" />
          </div>
        )}
      </div>
      {/* Show loader while loading */}
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default ViewStory;
