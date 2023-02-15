import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white ">
      <h1 className="text-5xl font-bold mb-20">ChatGPT Messenger</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-10 w-10" />

            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"Explain Something To Me"</p>
            <p className="infoText">
              "What Is The Difference Between A Cow And A Tiger ?"
            </p>
            <p className="infoText">"What Is The Color Of Moon?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-10 w-10" />

            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Change The ChatGPT Model To Use</p>
            <p className="infoText">
              Messages Are Stored In The Firebase's FireStore
            </p>
            <p className="infoText">
              Hot Toast Notification When ChatGPT Is Thinking
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-10 w-10" />

            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">May Occasionally Generate InCorrect Info</p>
            <p className="infoText">
              May Occasionally Produce Harmful Instructions Or Biased Content
            </p>
            <p className="infoText">
              Limited Knowledge Of World And Events After 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
