"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37f] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://devdiscourse.blob.core.windows.net/devnews/27_01_2023_23_50_36_5779729.jpg"
        alt="logo"
        width={300}
        height={300}
      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-bounce"
      >
        Sign In To Use ChatGPT
      </button>
    </div>
  );
}

export default Login;
