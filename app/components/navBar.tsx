"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


const NavBar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const notification = useSelector((state: RootState) => state.notification.notifications)

  const handleScroll = () =>{
    if (window.scrollY > lastScrollY){
      setShowNavbar(false)
    }else{
      setShowNavbar(true)
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const navItems = [
    { name: 'ABOUT', path: '/about' },
    { name: 'CCTV', path: '/cctv' },
    { name: 'HISTORY', path: '/history' },
  ]

  
  return (
    <nav className={`bg-falightgray fixed w-full z-10 justify-start items-start duration-300 ease-out ${showNavbar? 'translate-y-0':'-translate-y-full'}`}>
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
              navItems.map((item) => (
                <li key={item.name} className="flex items-center">
                  <Link 
                    href={item.path} 
                    className={`h-full px-6 py-2 duration-300 hover:bg-falightgray hover:text-fablue flex items-center font-bold 
                      ${pathName === item.path ? 'bg-falightgray text-fablue' : 'bg-fablue text-falightgray'}`}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {item.name === "CCTV" && notification.length > 0 && (
                        <span className="flex justify-center items-center ml-2 text-falightgray rounded-full bg-red-600 text-xs p-1 w-6 h-6 ">{`${notification.length}`}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      </div>
    </nav>
  )
}


export default NavBar
