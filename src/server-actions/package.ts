"user-server";

import supabase from "@/config/supabase";
import { successResponse, errorResponse } from "@/helpers/request-responses";
import { IPackage } from "@/interfaces";
import { success } from "zod";

export const createPackage = async (pkg: Partial<IPackage>) => {
  const { data, error } = await supabase.from("packages").insert([pkg]);

  if (error) {
    return errorResponse(error.message);
  } else {
    return successResponse(null, "Package Created Successfully!");
  }
};

export const updatePackage = async (id: string, pkg: Partial<IPackage>) => {
  const { data, error } = await supabase
    .from("packages")
    .update(pkg)
    .eq("id", id);

  if (error) {
    return errorResponse(error.message);
  } else {
    return successResponse(null, "Package updated successfully!");
  }
};

export const getPackageById = async (id: string) => {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id);

  if (error || !data || data.length === 0 ) {
    return errorResponse("Package not found!");
  } else {
    return successResponse(data[0], "Package retrieve successfully!");
  }
};

export const deletePackage = async (id: string, pkg: Partial<IPackage>)  => {

  const {data, error} = await supabase
   .from("packages")
   .delete() 
   .eq("id",id)

   if (error) {
    return errorResponse(error.message);
   }
   return successResponse(null, "Package deleted successfully!");

}

export const getAllPackages = async () => {
  const { data, error } = await supabase.from("packages").select("*");
  if (error) {
    return errorResponse(error.message);
  }
  return successResponse(data, "Packages retrieved sucessfully!")
}