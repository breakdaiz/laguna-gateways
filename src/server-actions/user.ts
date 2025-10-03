"use server";

import { errorResponse, successResponse } from "@/helpers/request-responses";
import supabase from "../config/supabase";
import { IUser } from "../interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (payload: Partial<IUser>) => {
  payload.role = "user";
  // step1 : check if user already exist using email, if yes give sucess false

  const { data: existingUser, error: existingUserError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", payload.email);

  if (existingUserError) {
    return errorResponse(existingUserError.message);
  }

  if (existingUser && existingUser.length > 0) {
    return errorResponse("User already exists.");
  }

  // step2: if user does not exist, hash the password

  const hashPassword = await bcrypt.hash(payload.password || "", 10);
  payload.password = hashPassword;

  // step3: insert the user into the database

  const { data: newUser, error: insertError } = await supabase
    .from("user_profiles")
    .insert([payload]);
  if (insertError) {
    return {
      success: false,
      message: insertError.message,
    };
  }
  return {
    success: true,
    message: "User registered successfully",
  };
};
