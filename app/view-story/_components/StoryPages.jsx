import React from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';

const StoryPages = ({ storyChapter }) => {

  const playSpeech = (text) => {
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  };

  return (
    <div>
      <h2 className='flex flex-wrap justify-between text-2xl font-bold text-primary'>
        {storyChapter?.title}
        <span className='text-3xl cursor-pointer' onClick={() => playSpeech(storyChapter?.story_text)}>
          <MdPlayCircleFilled />
        </span>
      </h2>
      
      <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100 text-wrap '>
        {storyChapter?.story_text}
      </p>
    </div>
  );
};

export default StoryPages;
