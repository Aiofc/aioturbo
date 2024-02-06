import * as z from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().email({ message: '请输入规范的邮箱地址' }),
  username: z.string().min(2, { message: '用户名至少2个字符' }),
  password: z.string().min(8, { message: '密码至少8位' }),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  email: z.string().email({ message: '请输入规范的邮箱地址' }),
  password: z.string().min(8, { message: '密码至少8位' }),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;


