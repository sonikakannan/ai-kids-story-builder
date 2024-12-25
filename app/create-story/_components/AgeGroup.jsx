'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const AgeGroup = ({userSelection}) => {
    const OptionList=[
        {
            label:'0-2 Years',
            imageUrl:'/02Years.png',
            isFree:true
        },
        {
            label:'3-5 Years',
            imageUrl:'/35Years.png',
            isFree:true
        },
        {
            label:'5-8 Years',
            imageUrl:'/58Years.png',
            isFree:true
        },
    ]
  const[selectedOption, setSelectedOption] = useState()
  const onUserSelect=(item)=>{
    setSelectedOption(item.label)
    userSelection({
        fieldValue:item?.label,
        fieldName:'ageGroup'
    })
}
    return (
      <div>
          <h2
          className='font-bold text-4xl text-primary'
          >3. Age Group</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 '>
              {OptionList.map((item,index)=>(
                  <div key={index} 
                  className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 
                      ${selectedOption==item.label?'grayscale-0 border-2 rounded-3xl border-primary':' grayscale'}`}
                  onClick={()=>onUserSelect(item)}
                  >
                      <h2 className='absolute bottom-5 text-white text-2xl text-center w-full'>{item.label}</h2>
                      <Image src={item.imageUrl} alt={item.label} width={300} height={500}
                      className='object-cover h-[260px] rounded-3xl '
                      />
                  </div>
              ))}
          </div>
      </div>
    )
}

export default AgeGroup