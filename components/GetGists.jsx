'use client'
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import secureLocalStorage from "react-secure-storage";

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

export  function GetGists() {
  const [userNameToSearch, setUserNameToSearch] = React.useState('');
  const token = process.env.NEXT_PUBLIC_gh_token;

  const { data, error } = useSWR(
    userNameToSearch ? `https://api.github.com/users/${userNameToSearch}/gists` : null,
    (url) => fetcher(url, token),
    { revalidateOnFocus: true } // Optionally, enable revalidation on focus
  );

  React.useEffect(() => {
      if (data) {
        console.log('data', data);
        const Feeding_Dates_Contributions = processingGists(data)
        console.log('Feeding_Dates_Contributions', Feeding_Dates_Contributions);
        secureLocalStorage.setItem("gistsData", Feeding_Dates_Contributions);
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
        <input placeholder="Your gh username" className="text-black font-bold p-2 bg-neutral-50 rounded-lg" type="text" value={userNameToSearch} onChange={(e) => setUserNameToSearch(e.target.value)} />
        
      </div>
    );
  }

  return (
    <>
        <div className="md:flex md:flex-row md:items-center md:gap-4 mb-2">
        <input placeholder="Your gh username" className="text-black font-bold p-2 bg-neutral-50 rounded-lg" type="text" value={userNameToSearch} onChange={(e) => setUserNameToSearch(e.target.value)} />
        
      
        {error && <div>not found</div>}
        {(!data && !error) &&
          <div className="stage px-4">
            <div className="dot-flashing"></div>
          </div>}
        {data && 
        <Link href={`/${userNameToSearch}`} className="flex rounded-lg bg-indigo-800 p-2 hover:bg-indigo-900 md:mt-0 mt-2 md:mb-0 mb-2">
        wrap
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
          </Link>
        }
    </div>
          
    </>
  );
}