"use client";

// import { ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();
  // const router = useRouter();

  // Using react firebase hooks for reading collection data
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  // console.log(session?.user?.image);

  // const handleBack = () => {
  //   router.push("/");
  // };

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 border-gray-700/50 border-b-4">
        {/* <ArrowDownLeftIcon
          onClick={handleBack}
          className="h-8 w-8 rotate-45 text-white m-2 cursor-pointer border-2 rounded-full p-2 animate-pulse "
        /> */}
        <div>
          <NewChat />

          {/* Model Selection */}
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          {/* Map Through The ChatRows */}

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <>
          <img
            onClick={() => signOut()}
            src={session.user?.image!}
            alt="User Pic"
            className="rounded-full cursor-pointer h-12 w-12 mx-auto m-2 hover:opacity-50"
          />
          <span className="text-center mb-2 text-lg text-gray-300">
            {session.user?.name!}
          </span>
        </>
        //
      )}
    </div>
  );
}

export default SideBar;
