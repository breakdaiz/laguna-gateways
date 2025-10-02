"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { registerUser } from "@/server-actions/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(8).max(50),
});

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await registerUser(values);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      router.push("/?formType=login");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <div className='w-full px-10'>
      <Form {...form}>
        <h1 className='text-xl mb-6 font-bold text-primary'>
          Register your Account
        </h1>
        <hr className='border-b border-gray-200 my-5' />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Enter Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-center'>
            <h1 className='flex gap-5 text-sm '>
              Already have an account?
              <Link className='text-sm underline' href={"/?formType=Login"}>
                Login
              </Link>
            </h1>
            <Button type='submit' disabled={loading}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
