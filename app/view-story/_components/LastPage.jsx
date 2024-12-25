import { Button } from '@nextui-org/button';
import React from 'react';

const LastPage = () => {


  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-blue-500 to-blue-700 text-white p-10 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>
      <p className="text-xl mb-8">You've reached the end of the story.</p>
      <Button
        color="primary"
        size="lg"
        className="text-xl bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500"
      >
        Finish
      </Button>
      <p className="mt-6 text-lg">Thank you for reading!</p>
    </div>
  );
};

export default LastPage;
