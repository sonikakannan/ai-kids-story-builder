import React from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';

const StoryPages = ({ storyChapter }) => {

  const playSpeech = (text) => {
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  };

  return (
    <div className='w-full h-full flex flex-col gap-2'>
      <h2 className='flex flex-wrap justify-between  items-cente md:text-2xl font-bold text-primary'>
        {storyChapter?.title}
        <span className='text-3xl cursor-pointer' onClick={() => playSpeech(storyChapter?.story_text)}>
          <MdPlayCircleFilled />
        </span>
      </h2>
      
      <p className='md:text-xl p-10 mt-3 rounded-lg text-black bg-slate-100 overflow-auto '>
        {storyChapter?.story_text}
      </p>
    </div>
  );
};

export default StoryPages;
