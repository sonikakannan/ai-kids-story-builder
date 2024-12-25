'use client';
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal';
import Image from 'next/image';
import { MdOutlineTimer } from 'react-icons/md';

const CustomLoader = ({ isLoading }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Start the timer when loading starts
  useEffect(() => {
    if (isLoading) {
      setStartTime(Date.now()); // Record the start time
      onOpen(); // Open the modal when loading starts
    }
  }, [isLoading]);

  // Update the elapsed time while loading
  useEffect(() => {
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Elapsed time in seconds
      }, 1000);
    } else {
      clearInterval(interval); // Stop the interval once loading is complete
    }

    return () => clearInterval(interval); // Cleanup interval when the component unmounts or isLoading changes
  }, [isLoading, startTime]);

  return (
    <div>
      {isLoading && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="p-10 flex w-full items-center justify-center">
                  <Image
                    src={'/loader.gif'}
                    alt="loader"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px]"
                  />
                  <div className="text-center">
                    <h2 className="font-bold text-2xl text-primary">
                      Please wait...😊 Story is generating... It's take 2-3 Min😜
                    </h2>
                    {startTime && (
                      <p className="text-lg text-primary flex justify-center items-center">
                        <MdOutlineTimer /> {elapsedTime} {elapsedTime === 1 ? 'second' : 'seconds'}
                      </p>
                    )}
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CustomLoader;
