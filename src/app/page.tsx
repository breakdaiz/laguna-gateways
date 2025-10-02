"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import myImage from "../assets/hero2.png"; // Adjust path as needed

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RegisterForm from "./(public)/_components/register-form";
import LoginForm from "./(public)/_components/login-form";
import { useSearchParams } from "next/navigation";

const HomePage = () => {
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const searchParams = useSearchParams();
  const formType = searchParams.get("formType");

  return (
    <div>
      {/* Navigation Menu */}

      <nav className='flex items-center w-full px-8 py-5 bg-primary'>
        {/* Logo (left) */}
        <div className='flex-1 flex items-center'>
          {/* <img
        src='/logo.png'
        alt='Logo'
        className='h-8 w-8 mr-2'
        style={{ objectFit: "contain" }}
      /> */}
          <span className='font-bold text-lg text-secondary'>
            Laguna Gateway
          </span>
        </div>
        {/* Title Menu (right) */}
        <div className='flex-1 flex items-center justify-end space-x-3'>
          <Button
            onClick={() => setOpenSidebar(true)}
            className='bg-white font-bold text-primary hover:bg-blue-800 hover:text-secondary  cursor-pointer'
          >
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

      {/* Hero Section */}
      <div className='grid lg:grid-cols-2 h-[85vh] px-10 items-center justify-center'>
        <div className='col span-1 mt-20 lg:mt-0'>
          <div className='flex flex-col gap-2 px-10'>
            <h1 className='text-lg text-primary font-bold'>
              Discover & Book your Dream Vacation
            </h1>
            <p className='text-base  text-gray-900 font-semibold'>
              Welcome to LagunaGateway, your ultimate travel companion. Explore
              breathtaking destinations, find the best deals on flights and
              accommodations, and create unforgettable memories with our
              user-friendly platform. Start your adventure today! Welcome to
              LagunaGateway, your ultimate travel companion. Explore
              breathtaking destinations, find the best deals on flights and
              accommodations, and create unforgettable memories with our
              user-friendly platform. Start your adventure today!
            </p>
            <Button className='w-40 bg-primary text-secondary font-bold hover:bg-blue-800 hover:text-white mt-4 cursor-pointer'>
              Get Started
            </Button>
          </div>
        </div>
        <div className='col span-1 justify-center items-center flex'>
          <Image
            width={800}
            height={96}
            src={myImage}
            objectFit='contain'
            alt=''
          />
        </div>
      </div>

      {openSidebar && (
        <Sheet open={openSidebar} onOpenChange={open => setOpenSidebar(open)}>
          <SheetContent className='lg:min-w-[500px]'>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className='flex items-center justify-center h-screen'>
              {formType === "register" ? <RegisterForm /> : <LoginForm />}
            </div>
            {/* 
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default HomePage;
