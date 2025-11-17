"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  small_description: z.string().min(1, "Small description is required"),
  full_description: z.string().min(1, "Full description is required"),
  start_date_time: z.string().min(1, "Start date and time is required"),
  end_date_time: z.string().min(1, "End date and time is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  duration: z.string().min(1, "Duration is required"),
  price_per_member: z.number().min(0, "Price per member must be at least 0"),
  guide_name: z.string().min(1, "Guide name is required"),
  guide_mobile_number: z.string().min(1, "Guide mobile number is required"),
});

const PackageForm = ({ formType }: { formType: "add" | "edit" }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      small_description: "",
      full_description: "",
      start_date_time: "",
      end_date_time: "",
      capacity: 1,
      duration: "",
      price_per_member: 1,
      guide_name: "",
      guide_mobile_number: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <div className='mt-5'>
      <Form {...form}>
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
                  <Input placeholder='Enter package name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='small_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Small Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Enter Small Description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <FormField
              control={form.control}
              name='start_date_time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date & Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='end_date_time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date & Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      {...field}
                      onChange={e => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Duration' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price_per_member'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Member</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={1}
                      {...field}
                      onChange={e => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='guide_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guide Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Guide Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='guide_mobile_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guide Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Guide Mobile Number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h1 className='text-sm'>Select images (Optional)</h1>
            <Input
              placeholder='Select Images'
              type='file'
              multiple
              accept='image/*'
            />
          </div>

          <div className='flex justify-end gap-5'>
            <Button variant={"outline"} disabled={loading} type='button'>
              Cancel
            </Button>
            <Button disabled={loading} type='submit'>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PackageForm;
