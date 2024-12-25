'use client'
import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { ToastContainer } from 'react-toastify'
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { UserDetailContext } from './_context/UserDetailContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const Provider = ({ children }) => {
  const [userDetail, setUserDetail] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      saveNewUserIfNotExist();
    }
  }, [user]);

  const saveNewUserIfNotExist = async () => {
    const userResp = await db.select().from(Users)
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''));
  

    if (!userResp[0]) {
      const result = await db.insert(Users).values({
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        userName: user?.fullName
      }).returning({
        userEmail: Users.userEmail,
        userName: Users.userName,
        userImage: Users.userImage,
        credit: Users.credit
      });
      console.log("New User result", result[0]);
      
      // Corrected this line
      setUserDetail(result[0]);
    } else {
      setUserDetail(userResp[0]);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??'' }}>
      <NextUIProvider>
        <Header />
        {children}
        <ToastContainer />
      </NextUIProvider>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
