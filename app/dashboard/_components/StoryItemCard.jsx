import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import Link from 'next/link';

const StoryItemCard = ({ story }) => {
  return (
    <Link href={`/view-story/${story?.storyId}`} passHref>
    <Card isFooterBlurred className="w-full h-auto max-w-sm mx-auto hover:scale-105 transition-all cursor-pointer">
        <Image
          alt="Card example background"
          className="z-0 w-full h-full scale-125 object-cover"
          src={story?.coverImage}
        />
<CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-base">{story?.output?.title || "Loading..."}</p>
          </div>

          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Read Now
          </Button>
          
        </CardFooter>
    </Card>
    </Link>
  );
};

export default StoryItemCard;
