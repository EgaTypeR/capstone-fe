'use client'
import React, {  } from 'react'
import Image from 'next/image'


interface SideBarProps {
  searchTerm: string,
  setSearchTerm: (term: string)=>void,
  selectedCategory: string,
  setSelectedCategory: (category: string) => void
}

export default function SideBar({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory}: SideBarProps) {

  const categories = ['All History Cases', 'On Going', 'Done']

  return (

    <div className='flex flex-col justify-start bg-fagray w-1/5'>
      <div className='mx-10 mt-8'>

      
      <div className='flex flex-row mb-10 py-2 px-3 w-full border rounded-lg text-black bg-falightgray'>
        <Image 
        src={'/assets/search.svg'}
        alt='search logo'
        width={24}
        height={24}
        />
        <input 
        type="text" 
        value={searchTerm}
        onChange={(e)=>{
          setSearchTerm(e.target.value)
        }}
        placeholder='Search...'
        className='w-full mx-2 text-black bg-falightgray outline-none border-none'
        />

      </div>

      <div className='flex flex-col justify-start'>
        <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={`block group w-full text-left p-2 mb-4 relative text-lg font-bold`}
            >
              {category}
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 w-full h-1 rounded-md bg-falightgray transition-transform duration-500 ease-out transform ${
                  selectedCategory === category
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                } origin-left`}
              />
            </button>
          </li>
        ))}
        </ul>
      </div>
      </div>
    </div>
  )
}
