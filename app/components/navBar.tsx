"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


const NavBar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CCTV', path: '/cctv' },
    { name: 'ALERT', path: '/alert' },
    { name: 'HISTORY', path: '/history' },
    { name: 'CONTACT', path: '/contact' },
  ]

  
  return (
    <nav className="bg-falightgray fixed w-full z-10 justify-start items-start">
      <div className="bg-fablue justify-start items-start mb-1">
      <div className="px-10 flex justify-between h-14">
        <div className="flex items-center">
          <Link href="/" className="">
            <Image
              src={'/assets/logo-text-56.png'}
              alt="text icon"
              width={194/1.5}
              height={56/1.5}
            />
          </Link>
        </div>
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-falightgray focus:outline-none"
          >
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex">
        {
            navItems.map((item)=>(
              <li key={item.name} className="flex items-center">
                <Link href={item.path} 
                className={`h-full px-6 py-2 duration-300 hover:bg-falightgray hover:text-fablue flex items-center
                  font-bold
                  ${pathName === item.path? 'bg-falightgray text-fablue':'bg-fablue text-falightgray'}`
                }>
                  {item.name}
                </Link>
              </li>
            )
            )
          }
        </ul>
        </div>
      </div>
      </div>
    </nav>
  )
}


export default NavBar
