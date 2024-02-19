'use client'
import React, { Suspense } from "react";
import useSWR from "swr";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Generated from "./Generated";
import Loading from "@/app/loading";
import Image from "next/image";
// import axios from 'axios';
const fetcher = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gists');
  }

  return response.json();
};

export function GetGists() {
  const [userNameToSearch, setUserNameToSearch] = React.useState('');
  const token = process.env.NEXT_PUBLIC_gh_token;

  const { data, error } = useSWR(
    userNameToSearch ? `https://api.github.com/users/${ userNameToSearch}/gists` : null,
    (url) => fetcher(url, token),
    { revalidateOnFocus: true } // Optionally, enable revalidation on focus
  );
  const [gistsData, setgistsData] = React.useState({});
  const [Owner, setOwner] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [ass, setass] = React.useState(false);
  const [follower, setfollower] = React.useState(0);
  const [following, setfollowing] = React.useState(0);
  React.useEffect(() => {
    console.log('data', data);
      if (data) {
        const ass = async () => {
          setgistsData(processingGists(data))

        const followersResponse = await fetch(`https://api.github.com/users/${userNameToSearch}/followers`);
          const followersData = await followersResponse.json();
          console.log('followersData', followersData);
          setfollower(followersData.length)
          const followingResponse = await fetch(`https://api.github.com/users/${userNameToSearch}/following`);
          const followingData = await followingResponse.json();
          console.log('followingData', followingData);
          setfollowing(followingData.length)
        }
        ass()
    }
      else {
        setass(true)
    }
    if (data) {
      const plainOwner = {
        login:`${userNameToSearch}`,
        avatar_url:'/plain.jpg',
      }
      setOwner(data[0]?.owner||plainOwner)      
    }
  }, [data]);

  const processingGists = (gists) => {
    const contributionsData = {};
    
    gists.forEach((gist) => {
      const { created_at, updated_at } = gist;
  
      if (created_at.split('-')[0] === '2023') {
        let realCreatedAt = '';
        
        if (created_at.split('-')[0] === '2023') {
          realCreatedAt = created_at.split('T')[0].replace(/-/g, '/');
        } else if (updated_at?.split('-')[0] === '2023') {
          realCreatedAt = updated_at.split('T')[0].replace(/-/g, '/');
        }
  
        const count = gist.files ? Object.keys(gist.files).length + 1 : 0;
        contributionsData[realCreatedAt] = contributionsData[realCreatedAt] ? contributionsData[realCreatedAt] + count : count;
      }
    });
  
    return contributionsData;
  };
  
  if (!userNameToSearch) {
    return (
      <div className="flex flex-row items-center gap-4">
         @
        <input placeholder="Your GH username" className=" autofocus focus:outline-none focus:ring focus:border-indigo-800 text-black font-bold p-2 bg-neutral-50 rounded-lg" type="text"  value={userNameToSearch} onChange={(e) => setUserNameToSearch(e.target.value)} />
        
      </div>
    );
  }

  return (
    <>
      <div className="md:flex flex-col md:flex-row md:items-center gap-4 mb-2">
        @
        <input placeholder="Your gh username" className="ml-4 md:ml-0 autofocus focus:outline-none focus:ring focus:border-indigo-800 text-black font-bold p-2 bg-neutral-50 rounded-lg" type="text" value={userNameToSearch} onChange={(e) => setUserNameToSearch(e.target.value)} />
        
      
        {error && <div className="">not a user</div>}
        {(!data && !error) &&
          <Loading/>
        }
        {data && 
        
           <React.Fragment>
            <button className="p-2 md:w-fit w-full flex rounded-lg bg-indigo-800 p-2 hover:bg-indigo-900 md:mt-0 mt-2 md:mb-0 mb-2"
                         onClick={() => setOpen(true)}
                         >
        wrap Me
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
          </button>
           <Modal open={open} onClose={() => setOpen(false)}>
             <ModalDialog>
                <DialogTitle>2023 Github Gists Unwrapped</DialogTitle>
                {ass && (
                  <a href={`https://gist.github.com/${Owner?.login}`} target='_blank' className="flex flex-row gap-2 items-center">
                    <Image
                      priority
                      src={Owner?.avatar_url || '/plain.jpg'}
                      
                    alt='avatar_url'
                    className="rounded-full"
                    width={60} 
                      height={60} />
                    <div className="flex flex-col">
                    <p>@{Owner?.login}</p>
                      <div className="flex flex-row gap-2">
                      <p className="text-xs text-gray-400">{follower} Followers</p>
                    <p className="text-xs text-gray-400">{following} Following</p>
                    </div>
                    </div>
                  </a>
                )}
                
               <Suspense fallback={<Loading/>}>
                  <Generated contributions={gistsData}/>
        
                </Suspense>
                
             </ModalDialog>
           </Modal>
         </React.Fragment>
        }
    </div>
          
    </>
  );
}
