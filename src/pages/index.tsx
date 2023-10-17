import React from "react";
import PassageLogin from "@/components/login";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { useEffect } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";

type HomeProps = {
  logOut: () => void, 
  isAuthorized: boolean;
  userID: any;
}

export default function Home({ isAuthorized, userID, logOut,}: HomeProps) {
  useEffect(() => {
    if (isAuthorized) {
      Router.push("/dashboard"); 
    } else {
      logOut()
    }
  },[logOut]);

  return (
    <div>
      <PassageLogin />
      <button className='bg-white opacity-90 py-2 px-10 m-10 rounded-md'onClick={logOut}>LOG OUT</button>
    </div>
  );
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  //  db queries, etc
  return {
    props: {
      isAuthorized: loginProps?.isAuthorized ?? false,
      userID: loginProps?.userID ?? "",
    },
  };
}) satisfies GetServerSideProps<{
  isAuthorized: boolean;
  userID: any;
}>;
