'use client'
import { useUser } from '@clerk/nextjs'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    const { isSignedIn } = useUser()
    return (
        <div className='px-10 md:px-28 mt-10 md:mt-5 w-full min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='flex flex-col justify-center'>
                    <h2 className='text-[50px] md:text-[60px] text-primary font-extrabold leading-tight py-1'>
                        Craft Magical Stories for kids in Minutes
                    </h2>
                    <p className='text-primary text-xl md:text-2xl'>Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading.It only take a few seconds!</p>
                    {isSignedIn && (
                        <Link href={isSignedIn ? "/dashboard" : "/get-started"}>
                            <Button size='lg' color='primary'
                                className='mt-5 font-bold text-2xl p-8 flex lg:hidden'
                            >{isSignedIn ? 'Dashboard' : 'Get Started'}</Button>
                            </Link>
                    )}
                     <Link href={"/create-story"}>
                            <Button size='lg' color='primary'
                                className='mt-5 font-bold text-2xl p-8 hidden lg:flex'
                            >Create Story</Button>
                            </Link>
                </div>
                <div className='flex items-center justify-center'>
                    <Image src={'/hero.png'} alt='hero' width={700} height={400} />
                </div>
            </div>
        </div>
    )
}

export default Hero