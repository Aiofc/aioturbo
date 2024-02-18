"use server";
/**
 * 状态： 代码联通性测试通过，等待后端接口联通后进行测试
 */
import { SignInFormType, SignUpFormType } from "../types";

export async function signIn(signInData: SignInFormType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      },
    );

    const data = await response.json();
    return data;
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
        body: JSON.stringify({ ...signUpData, age: 0}),
      },
    );

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
