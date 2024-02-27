'use client';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GitHubSignInButton from './github-auth-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignInFormType, signInFormSchema } from '../../types/index';

export default function UserSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: 'demo@gmail.com',
    password: '12345678',
  };

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SignInFormType) => {
    setLoading(true);
    // 登录请求
    // const signInData = await signIn('credentials', {
    //   email: data.email,
    //   password: encryptA256GCM(data.password),
    //   redirect: false,
    // });
    setLoading(false);
    // 判断状态
    // if (signInData?.error) {
    //   console.log('登录失败', signInData.error);
    // } else if (signInData?.ok && signInData.status === 200) {
    //     console.log('登录成功', signInData)
    //   router.push(callbackUrl? callbackUrl : '/dashboard')
    // }
  };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">用户登录</h1>
        <p className="text-sm text-muted-foreground">
          请输入您的电子邮件地址登录
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="输入您的邮箱..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入密码..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            登录
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">或者</span>
        </div>
      </div>
      <GitHubSignInButton />
    </>
  );
}
