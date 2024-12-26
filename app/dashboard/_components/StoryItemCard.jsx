import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import Link from 'next/link';

const StoryItemCard = ({ story }) => {
  return (
    
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer">
        <Image
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={story?.coverImage}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-lg">{story?.output?.title || "Loading..."}</p>
          </div>
          <Link href={`/view-story/`+story?.storyId}>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Read Now
          </Button>
          </Link>
        </CardFooter>
      </Card>
    
  );
};

export default StoryItemCard;
