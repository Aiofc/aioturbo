"use client";
import React, { useRef } from "react";
import SliderCaptcha from "@repo/rc-slider-captcha";
import { getVerify, verifyCode } from "../../../actions/auth-action.ts";
import { aesEncrypt } from "../../../lib/symmetric-encryption.ts";
import {verifyStore} from "../../../stores/verifyinfo.ts";

interface VerifyToken {
  secretKey: string;
  token: string;
}

interface SlideVerifyProps {
  login?: () => Promise<void>;
}

function SlideVerify(slideVerify: SlideVerifyProps) {
  const { login } = slideVerify;
  const { setVerification } = verifyStore((state) => state);

  const verifyTokenRef = useRef<VerifyToken>({} as VerifyToken);
  const bgWidth = 330;
  return (
      <SliderCaptcha
        mode="embed"
        bgSize={{ width: bgWidth, height: 155 }}
        puzzleSize={{ width: 50 }}
        request={async () => {
          const response = await getVerify({ captchaType: "" });
          console.log(response);
          if (response.ok) {
            verifyTokenRef.current = {
              secretKey: response.data.repData.secretKey,
              token: response.data.repData.token,
            };
          }
          return {
            bgUrl: `data:image/png;base64,${response.data.repData.originalImageBase64}`,
            puzzleUrl: `data:image/png;base64,${response.data.repData.jigsawImageBase64}`,
          };
        }}
        onVerify={async (data) => {
          const verifyToken = verifyTokenRef.current;
          // verify data
          const moveLeftDistance = (Math.round(data.x) * 310) / bgWidth;
          const captchaVerification = verifyToken.secretKey
            ? aesEncrypt(
                verifyToken.token +
                  "---" +
                  JSON.stringify({
                    x: moveLeftDistance,
                    y: 5.0,
                  }),
                verifyToken.secretKey,
              )
            : verifyToken.token +
              "---" +
              JSON.stringify({ x: moveLeftDistance, y: 5.0 });
            setVerification(captchaVerification);
          const verifyData = {
            pointJson: verifyToken.secretKey
              ? aesEncrypt(
                  JSON.stringify({
                    x: moveLeftDistance,
                    y: 5.0,
                  }),
                  verifyToken.secretKey,
                )
              : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
            token: verifyToken.token,
            captchaType: "",
          };
          const response = await verifyCode(verifyData);
          if (response.ok && response.data.repCode === "0000") {
            console.log("验证成功");
            await login();
            return Promise.resolve(true);
          } else {
            console.log("验证失败");
            return Promise.reject(false);
          }
        }}
      />
  );
}

export default SlideVerify;
