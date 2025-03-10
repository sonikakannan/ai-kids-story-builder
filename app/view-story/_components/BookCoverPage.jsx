import Image from 'next/image';
import React from 'react';

const BookCoverPage = ({ imageUrl }) => {
  // Provide a fallback image URL in case imageUrl is invalid
  const fallbackImageUrl = '/story.png'; // Replace with a valid default image path
  

  return (
    <div className=' w-full h-full'>
      <Image
        src={imageUrl || fallbackImageUrl}
        alt="coverImage"
        layout='fill'
        objectFit="cover" 
        priority // Ensures it loads faster
      />
    </div>
  );
};

export default BookCoverPage;
