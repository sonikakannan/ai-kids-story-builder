'use client'
import React, { useContext, useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
import uuid4 from 'uuid4'
import CustomLoader from './_components/CustomLoader'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import { UserDetailContext } from '../_context/UserDetailContext'
import { eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMT
const CreateStory = () => {
  // Initialize formData as an empty object
  const [formData, setFormData] = useState({});
  const [loading, setLoading] =useState(false)
  const router= useRouter()
  const notify=(msg)=>toast(msg)
  const notifyError=(msg)=>toast.error(msg)
  const {user} = useUser()
  const {userDetail, setUserDetail} =useContext(UserDetailContext)

  const onHandleUserSelection = (data) => {
    
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue 
    }));
    
    
   
  };

  const GenerateStory = async () => {
    
    if(userDetail.credit<=0){
      notifyError("You don't have enough credits!!")
      return ;
    }
    notify("Choice Selected")
    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT
      ?.replace("{ageGroup}", formData?.ageGroup ?? "")
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "");
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text().replace(/(})(,?)(\n *\})/g, "$1"));
      // Set default values for title and imagePrompt
      const title = story?.cover?.title || 'Default Title';
      const imagePrompt = story?.cover?.image_prompt || 'Default Image Prompt';
  
      const imageResp = await axios.post('/api/generate-image', {
        prompt: `Add text with title: ${title} in bold text for book cover, ${imagePrompt}`,
      });
  
      const imageUrl = imageResp?.data?.imageUrl;
     
  
      const resp = await SaveInDB(result?.response.text(), imageUrl);  // Pass imageUrl to SaveInDB
     
      notify("Story generated!!");
      await UpdateUserCredits()
      router?.push(`/view-story/${resp[0].storyId}`);

      setLoading(false);
  
    } catch (e) {
     
      notifyError("Server Error, Try again");
      setLoading(false);
    }
  };
  
  const SaveInDB = async (output, imageUrl) => {  // Add imageUrl as a parameter
    const recordId = uuid4();
    setLoading(true);
    try {
      const result = await db.insert(StoryData).values({
        storyId: recordId,
        ageGroup: formData?.ageGroup,
        imageStyle: formData?.imageStyle,
        storySubject: formData?.storySubject,
        storyType: formData?.storyType,
        output: JSON.parse(output),
        coverImage: imageUrl,  // Use imageUrl here
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        userName: user?.fullName,
      }).returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (e) {
      
      setLoading(false);
    }
  };
  
  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credit:Number(userDetail?.credit-1)
    }).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }  
  return (
    <div className='p-5 py-15 md:py-5 md:px-20  min-h-screen'>
      <h2 className='font-extrabold text-[50px] md:text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
      <p className=' text-xl md:text-2xl text-primary text-center'>Unlock your creativity with AI. Craft stories like before! Let our AI bring your imagination to life, one story at a time.</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center md:place-items-start gap-10 mt-14'>
        {/* Story Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* Image Group */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className='flex justify-end my-10 flex-col items-end'>
        <Button color='primary' className='p-10 text-2xl'
         onPress={GenerateStory}
         disabled={loading}
         >Generate Story</Button>
         <span>1 Credit will user</span>
      </div>
      <CustomLoader isLoading={loading}/>

    </div>
  );
};

export default CreateStory;
