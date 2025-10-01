import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HomePage() {
  return (
    <div className='p-5 flex flex-col w-max gap-5'>
      <h1>HomePage</h1>
      <Button>Default Button</Button>
      <Button variant='outline'>Outline Button</Button>
      <Input placeholder='First Name' />
    </div>
  );
}

export default HomePage;
