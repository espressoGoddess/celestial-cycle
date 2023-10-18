import React from 'react'
import Dashboard from '../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';

export default function dashboard ({isAuthorized, userID }: AuthProps){
  return (<Dashboard isAuthorized={isAuthorized} userID={userID}/>)
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    const { data } = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps.userID);
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        userID: ''
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;

