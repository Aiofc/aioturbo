import * as z from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().email({ message: '请输入规范的邮箱地址' }),
  username: z.string().min(2, { message: '用户名至少2个字符' }),
  password: z.string().min(6, { message: '密码至少6位' }),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  username: z.string().min(3, { message: '请输入至少3个字符' }),
  password: z.string().min(6, { message: '密码至少6位' }),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;


