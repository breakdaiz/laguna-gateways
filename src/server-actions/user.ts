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
    return errorResponse(insertError.message);
  }
  return successResponse(newUser, "User registered successfully.");
};

export const loginUser = async (payload: Partial<IUser>) => {
  //  step1: check if user exist using email, if not give success false
  const { data: existingUsers, error: existingUsersError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", payload.email);

  if (existingUsersError) {
    return errorResponse(existingUsersError.message);
  }
  if (existingUsersError || !existingUsers || existingUsers.length === 0) {
    return errorResponse("User does not exist.");
  }
  const existingUser = existingUsers[0];

  // step2: if user exist, compare the password, if not match give success false
  const isPasswordMatch = await bcrypt.compare(
    payload.password || "",
    existingUser.password
  );
  if (!isPasswordMatch) {
    return errorResponse("Invalid password.");
  }
  if (payload.role !== existingUser.role) {
    return errorResponse(
      `You do not have permission to access this resource ${payload.role}`
    );
  }
  // step3: if password match, generate a JWT token and return success true
  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email, role: existingUser.role },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return successResponse({ token, role: payload.role }, "Login successful.");
};
