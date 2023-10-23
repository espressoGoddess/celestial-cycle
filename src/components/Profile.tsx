import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { AuthProps } from '@/types/types';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import Router, { useRouter } from "next/router";
import { useEffect } from 'react';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export type ProfileProps = AuthProps & {
  userID: string | number;
};

function Profile({isAuthorized, userID, data}: ProfileProps) {
  const router = useRouter()
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
    if (!isAuthorized) {
      Router.push("/"); 
    }
  },[isAuthorized]);

  const signOut = async () => {
    if (userID !== 'ABrrCENR3M0I6XZ7NLA7gNCY'){
      new PassageUser().signOut();
    }
    Router.push("/");
  };

  dotenv.config();
  const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;

  if (!passageAppId) {
    throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
  }

  const [year, month, date] = data ? data[0].last_cycle_start? data[0].last_cycle_start.split('-') : [] : []
  const endDate = new Date(data? data[0].last_cycle_start : '')
  endDate.setDate(endDate.getDate() + (data ? data[0].last_cycle_length : 0));

  return (
    <div className='flex flex-col items-center content-center mb-20'>
      <h1 className='m-7 text-center text-3xl'>{(userID === 'ABrrCENR3M0I6XZ7NLA7gNCY') && 'Log in to enjoy our profile feature!'}</h1>
      <div className='max-w-passage' >
        <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
      </div>
      {
        data &&  
        <article className='w-passage max-w-100vw text-black bg-white rounded-md p-5 mt-2'>
            <h2 className={`${(year && month && date) ? '' : 'text-center'}` + ' text-lg pb-3'}>Your Last Period</h2>
            {
              year && month && date
                ?
              <>
                <p className='pb-1'><span className='font-bold'>Start Date:</span> {`${months[parseInt(month) - 1]} ${date}, ${year}`}</p>
                <p className='pb-1'><span className='font-bold'>End Date:</span> {`${months[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`}</p>
                <p className='pb-1'><span className='font-bold'>Lasted:</span> {data[0].last_cycle_length} day{data[0].last_cycle_length > 1 ? 's' : ''}</p>
              </>
                :
              <div className='flex flex-col items-center'>
                <p className='text-center'>Nothing to see here yet. Add an entry to get started tracking your period!</p>
                <Link className='bg-grayblue w-4/5 text-center py-2 my-2 rounded-md' href={`${router.asPath.includes('demo') ? '/demo' : ''}/form`} >ADD AN ENTRY</Link >
              </div>
              
          }
          </article>
          
      }
      <button className='w-passage bg-white text-black opacity-90 py-2 px-10 m-2 rounded-md' onClick={signOut}>LOG OUT</button>
      <Navbar />
    </div>
  );
}
export default Profile;