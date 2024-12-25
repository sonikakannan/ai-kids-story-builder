'use client'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const BuyCredits = () => {
    const Options = [
        {
            id: 1,
            price: 1.99,
            credits: 10,
        },
        {
            id: 2,
            price: 2.99,
            credits: 30,
        },
        {
            id: 3,
            price: 5.99,
            credits: 75,
        },
        {
            id: 4,
            price: 9.99,
            credits: 150,
        },
    ]

    const [selectedPrice, setSelectedPrice] =useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const {userDetail,setUserDetail} = useContext(UserDetailContext)
    const router=useRouter()
    const notify=(msg)=>toast(msg)
    const notifyError=(msg)=>toast(msg)

    useEffect(() => {
        if (selectedOption) {
            const option = Options.find((opt) => opt.id === selectedOption)
            if (option) {
                
                setSelectedPrice(option.price)
            }
        }
    }, [selectedOption]) // Add dependency to trigger the effect when `selectedOption` changes

    const OnPaymentSucess=async()=>{
        const result=await db.update(Users)
        .set({
            credit:Options[selectedOption].credits+userDetail.credits
        }).where(eq(Users.userEmail, userDetail.userEmail))
        if(result){
            notify('Credit is Added')
            setUserDetail((prev)=>({
                ...prev,
                ['credit']:Options[selectedOption].credits+userDetail.credits
            }))
            router.push('/dashboard')
        }else{
            notifyError("Server Error")
        }
       
    }

    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40 text-center'>
            <h2 className='text-3xl font-bold text-primary'>Add More Credits</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center'>
                <div>
                    {Options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-6 my-3 border bg-primary text-center rounded-lg text-white cursor-pointer hover:scale-105 transition-all
                    ${selectedOption === option.id && 'bg-black'}`}
                            onClick={() => setSelectedOption(option.id)}
                        >
                            <h2>Get {option.credits} Credits = {option.credits} Story </h2>
                            <h2 className='font-bold text-2xl'>${option.price} </h2>
                        </div>
                    ))}
                </div>
                <div>
                    {selectedPrice>0&&<PayPalButtons
                        style={{ layout: 'horizontal' }}
                        disabled={!selectedOption}
                        onApprove={() => OnPaymentSucess()}
                        onCancel={()=>notifyError('Payment canceld')}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: selectedPrice.toFixed(2),
                                            currency_code:'USD'
                                        },
                                    },
                                ],
                            })
                        }}
                    />}
                </div>
            </div>
        </div>
    )
}

export default BuyCredits
