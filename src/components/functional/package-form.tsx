"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Editor } from "@tinymce/tinymce-react";

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
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/helpers/file-upload";
import { createPackage } from "@/server-actions/package";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImagesFiles, setSelectedImagesFiles] = React.useState<File[]>([]);

  const handleSelectImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setSelectedImagesFiles(prev => prev.filter((_, i) => i !== index));
  };

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

   async function onSubmit(values: z.infer<typeof formSchema>) {
   
    try {
      setLoading(true);
      let newImageUrls = [];
      for (const file of selectedImagesFiles) {
        const response = await uploadFileAndGetUrl(file);
        if (response.success) {
          newImageUrls.push(response.data);
        }
      }
      const imageUrls = [...existingImageUrls, ...newImageUrls];


       let response: any = null;
      if (formType === "add") {
       response = await createPackage({
          ...values,
          images: imageUrls,
          is_active: true,
          status: "active",
        });
      } else {
        // handle edit
      }

      if (response?.success) {
        toast.success("Package saved successfully!");
        router.push("/admin/packages");
      } else {
        toast.error(response.message || "Failed to save package");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("An error occured while submitting the form");
    } finally {
      setLoading(false);
    }
  }

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

          <FormField
            control={form.control}
            name='full_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Full Description</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    init={{
                      plugins: [
                        // Core editing features
                        "anchor",
                        "autolink",
                        "charmap",
                        "codesample",
                        "emoticons",
                        "link",
                        "lists",
                        "media",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "wordcount",
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Dec 2, 2025:
                        "checklist",
                        "mediaembed",
                        "casechange",
                        "formatpainter",
                        "pageembed",
                        "a11ychecker",
                        "tinymcespellchecker",
                        "permanentpen",
                        "powerpaste",
                        "advtable",
                        "advcode",
                        "advtemplate",
                        "ai",
                        "uploadcare",
                        "mentions",
                        "tinycomments",
                        "tableofcontents",
                        "footnotes",
                        "mergetags",
                        "autocorrect",
                        "typography",
                        "inlinecss",
                        "markdown",
                        "importword",
                        "exportword",
                        "exportpdf",
                      ],
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      ai_request: (request: any, respondWith: any) =>
                        respondWith.string(() =>
                          Promise.reject("See docs to implement AI Assistant")
                        ),
                      uploadcare_public_key: "3269a9eadf47ccc5960c",
                    }}
                    initialValue={field.value}
                    value={field.value}
                    onEditorChange={content => field.onChange(content)}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

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
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setSelectedImagesFiles([...selectedImagesFiles, ...files]);
                const imageUrls = files.map(file => URL.createObjectURL(file));
                setImages([...images, ...imageUrls]);
              }}
            />

            <div className='flex gap-5'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center border p-3   mt-5 rounded-md'
                >
                  <img
                    src={image}
                    className='w-40 h-40 aspect-auto object-cover rounded-md
                  '
                  />
                  <h1
                    onClick={() => handleSelectImageDelete(index)}
                    className='text-sm cursor-pointer underline nt-2'
                  >
                    Delete
                  </h1>
                </div>
              ))}
            </div>
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
