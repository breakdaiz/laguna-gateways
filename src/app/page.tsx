import { Button } from "@/components/ui/button";
import React from "react";

const Menu = () => (
  <nav className='flex items-center w-full px-8 py-5 bg-primary'>
    {/* Logo (left) */}
    <div className='flex-1 flex items-center'>
      {/* <img
        src='/logo.png'
        alt='Logo'
        className='h-8 w-8 mr-2'
        style={{ objectFit: "contain" }}
      /> */}
      <span className='font-bold text-lg text-secondary'>Laguna Gateway</span>
    </div>
    {/* Title Menu (right) */}
    <div className='flex-1 flex items-center justify-end space-x-3'>
      <Button className='bg-white font-bold text-primary hover:bg-blue-800 hover:text-secondary  cursor-pointer'>
        Login
      </Button>
      <Button className=' hover:text-blue-300 font-medium cursor-pointer'>
        About
      </Button>
      <Button className='text-secondary hover:text-blue-300 font-medium  cursor-pointer'>
        Contact
      </Button>
    </div>
  </nav>
);

const HomePage = () => {
  return (
    <div>
      <Menu />
      <div className='p-5'>HomePage</div>
    </div>
  );
};

export default HomePage;
