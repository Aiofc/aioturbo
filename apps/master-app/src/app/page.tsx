"use client";
import { Button } from "../components/ui/button";
import { useStore } from "../stores/userInfo";
import SlideVerify from "../components/auth/verify/slide-verify.tsx";
import { getVerify } from "../actions/auth-action.ts";

export default function Page(): JSX.Element {
  const userInfo = useStore((state) => state.userInfo);

  const setUserInfos = useStore((state) => state.setUserInfos);
  return (
    <main>
      <div className=" text-center text-red-500">hello master-app!</div>
      <div />
      {JSON.stringify(userInfo)}
      <div />
      <Button onClick={setUserInfos}>获取用户数据</Button>
      <SlideVerify />
    </main>
  );
}
