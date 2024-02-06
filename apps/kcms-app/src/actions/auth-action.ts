"use server";

import { SignInFormType, SignUpFormType } from "../types";

export async function signIn(signinData: SignInFormType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export async function signUp(signUpData: SignUpFormType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
