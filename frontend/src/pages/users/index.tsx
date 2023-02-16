import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import UserItemList from '@/components/UserItemList';
import UserSearch from '@/components/UserSearch';
import UserCreateButton from '@/components/UserCreateButton';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

export type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

export let getUsersUrl = process.env.API_HOST + '/users/';

// Check if running on browser we need to check this for docker for development
if (typeof window !== 'undefined') {
  getUsersUrl = process.env.API_HOST_LOCAL + '/users/';
}

const buildUrl = (baseUrl: string, query: ParsedUrlQuery): string => {
  let url = baseUrl;

  // build the query param for filtering users
  if (Object.keys(query).length) {
    url += '?';
    for (let key in query) {
      if (key != 'exact') {
        url += `${key}=${query[key]}&`;
      }
    }

    if (query.exact) {
      url += 'exact=true';
    }
  }

  return url;
};

export const getServerSideProps: GetServerSideProps<{
  data: UserData[];
}> = async ({ query }) => {
  const url = buildUrl(getUsersUrl, query);
  console.log('GET', url);
  const { data } = await axios.get(url);

  return {
    props: {
      data,
    },
  };
};

const Users = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState<typeof data>(data);

  const { query } = router;

  // Force update user list from client if delete a user
  // from the list
  useEffect(() => {
    if (update) {
      setUpdate(false);
      const url = buildUrl(getUsersUrl, query);
      try {
        axios.get<typeof data>(url).then((res) => setUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [update, query]);

  // Update user list if prop updated by search/filter user list from UI
  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <>
      <h4
        className="text-center text-primary fw-bold"
        style={{ paddingTop: '1.5rem' }}
      >
        Platform Users
      </h4>
      <UserSearch />
      <UserCreateButton />
      <UserItemList users={users} update={setUpdate} />
    </>
  );
};

export default Users;
