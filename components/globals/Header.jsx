import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

 const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-12 flex items-center bg-neutral-50 justify-between">
      <Image
        priority
        className="rounded-lg"
                  alt='icon'
                  src='/favicon.png'
                  width={35}
                  height={35}
              />
          <Link
              
              className="text-black text-sm font-medium hover:underline bg-white p-2 rounded-lg" href="https://github.com/Ebrahim-Ramadan/gh-gists-unwrapped" target='_blank'>
            Source Code
          </Link>
      </header>
  )
}

export default Header