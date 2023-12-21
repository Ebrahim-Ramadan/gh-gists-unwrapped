'use client'
import React from "react";
import useSWR from "swr";

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
  const [gistsData, setGistsData] = React.useState([]);
  const token = process.env.NEXT_PUBLIC_gh_token;

  const { data, error } = useSWR(
    userNameToSearch ? `https://api.github.com/users/${userNameToSearch}/gists` : null,
    (url) => fetcher(url, token),
    { revalidateOnFocus: true } // Optionally, able revalidation on focus
  );

  React.useEffect(() => {
      if (data) {
        console.log('data', data);
      setGistsData(data);
    }
  }, [data]);

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
      <button className="flex rounded-lg bg-indigo-800 p-2 hover:bg-indigo-900 md:mt-0 mt-2 md:mb-0 mb-2">
          wrap
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
        </button>
        {error && <div>not found</div>}
          {(!data && !error) && <div>Loading...</div>}
      {data && <div className="bg-green-800 p-2 font-bold rounded-lg text-sm">successfull fetch see the console</div>}
    </div>
          
    </>
  );
}
