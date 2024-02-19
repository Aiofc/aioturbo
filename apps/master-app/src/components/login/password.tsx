"use client";

import React from "react";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";
import { getToken } from "../../actions/login";

export default function Password() {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState("123456");

  function encryption(src: string, keyWord: string) {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 加密
    var encrypted = CryptoJS.AES.encrypt(src, key, {
      iv: key,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding,
    });
    return encrypted.toString();
  }

  /**
   * 登录
   * @param data
   */
  const login = async (data: any) => {
    // 密码加密
    const encPassword = encryption(data.password, "pigxpigxpigxpigx");

    const res = await getToken({
      ...data,
      password: encPassword,
    });
    console.log(res);
  };

  return (
    <div>
      <form
        onSubmit={() =>
          login({
            username: username,
            password: password,
            code: "",
            randomStr: "blockPuzzle",
            grant_type: "password",
            scope: "server",
          })
        }
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
