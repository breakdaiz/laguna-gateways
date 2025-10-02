"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Link from "next/link";

const rolesArray = [
  { id: 0, value: "user", label: "User" },
  { id: 1, value: "admin", label: "Admin" },
];
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
  role: z.string(),
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className='w-full px-10'>
      <Form {...form}>
        <h1 className='text-xl mb-6 font-bold text-primary'>
          Login your Account
        </h1>
        <hr className='border-b border-gray-200 my-5' />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
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

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex gap-10'
                  >
                    {rolesArray.map(role => (
                      <FormItem
                        key={role.id}
                        className='flex items-center gap-3'
                      >
                        <FormControl>
                          <RadioGroupItem value={role.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {role.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between items-center'>
            <h1 className='flex gap-5 text-sm '>
              Don't have an account?
              <Link className='text-sm underline' href={"/?formType=register"}>
                Register
              </Link>
            </h1>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
