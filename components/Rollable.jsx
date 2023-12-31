'use client'
import { useState } from 'react';
import './Rollable.css'
 // ... (existing code)

export const Rollable = () => {
  const [ASS, setASS] = useState(false);
  const ASSTrigger = () => {
    setASS(true)
    window.scrollTo({
      top: 600,
      behavior: 'smooth',
    })
}
  return (
    <main className="bg-neutral-50">
      <div className="h-[100vh] flex items-center justify-center">
        {ASS && <div className="expanding-circle"></div>}

       

        {/* Clickable SVG */}
        <div
          id="item"
          onClick={ASSTrigger}
          className={`cursor-pointer hover:bg-gray-100 items-center flex justify-center h-48 w-48 rounded-3xl shadow-[0px_0px_0px_1px,0px_1px_1px_-0.5px,0px_3px_3px_-1.5px,0px_6px_6px_-3px,0px_12px_12px_-6px,0px_24px_24px_-12px] shadow-black/[0.06] bg-gradient-to-b from-white to-black/[0.02] transform transition duration-500 hover:scale-110`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="150" height="150" viewBox="0 0 48 48"> <linearGradient id="1XJuQMc3whEUIMH7nHBV6a_wmRK8s3HIS45_gr1" x1="-1.151" x2="62.752" y1="9.473" y2="46.368" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#262626" stopOpacity="0"></stop><stop offset="1" stopColor="#262626" stopOpacity=".8"></stop></linearGradient><path fill="url(#1XJuQMc3whEUIMH7nHBV6a_wmRK8s3HIS45_gr1)" d="M44,24c0-11.046-8.954-20-20-20S4,12.954,4,24c0,8.885,5.799,16.407,13.815,19.014	c-0.001,0-0.003,0-0.004,0C19.755,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984c-0.305,0.056-0.603-0.04-0.825-0.23	c0.22,0.187,0.515,0.281,0.816,0.229C38.199,40.411,44,32.887,44,24z M17.815,43.014c0.302,0.054,0.599-0.039,0.82-0.226	C18.414,42.975,18.117,43.068,17.815,43.014z M18.901,42.444c-0.052,0.108-0.132,0.195-0.216,0.278	C18.769,42.639,18.849,42.552,18.901,42.444z M29.1,42.444c0.053,0.109,0.133,0.199,0.218,0.283	C29.234,42.643,29.153,42.553,29.1,42.444z"></path><linearGradient id="1XJuQMc3whEUIMH7nHBV6b_wmRK8s3HIS45_gr2" x1="-4.664" x2="45.347" y1="-3.232" y2="46.779" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#262626" stopOpacity="0"></stop><stop offset="1" stopColor="#262626" stopOpacity=".8"></stop></linearGradient><path fill="url(#1XJuQMc3whEUIMH7nHBV6b_wmRK8s3HIS45_gr2)" d="M37,23.5c0-2.897-0.875-4.966-2.355-6.424C35.591,15.394,34.339,12,34.339,12	c-2.5,0.5-4.367,1.5-5.609,2.376C27.262,14.115,25.671,14,24,14c-1.71,0-3.339,0.118-4.834,0.393	c-1.242-0.879-3.115-1.889-5.632-2.393c0,0-1.284,3.492-0.255,5.146C11.843,18.6,11,20.651,11,23.5c0,6.122,3.879,8.578,9.209,9.274	C19.466,33.647,19,34.764,19,36v0.305c-0.163,0.045-0.332,0.084-0.514,0.108c-1.107,0.143-2.271,0-2.833-0.333	s-1.229-1.083-1.729-1.813c-0.422-0.616-1.263-2.032-3.416-1.979c-0.376-0.01-0.548,0.343-0.5,0.563	c0.043,0.194,0.213,0.5,0.896,0.75c0.685,0.251,1.063,0.854,1.438,1.458c0.418,0.674,0.417,2.468,2.562,3.416	c1.53,0.677,2.988,0.594,4.097,0.327l0.001,3.199c0,0.639-0.585,1.125-1.191,1.013C19.755,43.668,21.833,44,24,44	c2.166,0,4.243-0.332,6.19-0.984C29.584,43.127,29,42.641,29,42.002V36c0-1.236-0.466-2.353-1.209-3.226	C33.121,32.078,37,29.622,37,23.5z"></path> </svg>
        </div>
      </div>
    </main>
  );
};
