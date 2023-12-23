'use client'
import {Suspense} from 'react'
import Demo from '@/components/Demo';
import secureLocalStorage from "react-secure-storage";
import Loading from './loading';
import AfterGeneration from '@/components/me/AfterGeneration';

export default function Home() {

  const ass = secureLocalStorage.getItem("gistsData");
  console.log('ass', ass);
  return (
    <>
        <div className='flex items-center p-4 md:p-16 justify-center min-h-screen'>
    <Suspense fallback={<Loading />}>
    <Demo contributions={ass} />

      </Suspense>
    </div>
      <AfterGeneration />
    </>
    
    
  )
}
