import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import axios from 'axios';

import UserItemList from '@/components/UserItemList';
import UserSearch from '@/components/UserSearch';
import UserCreateButton from '@/components/UserCreateButton';
import Paginate from '@/components/Paginate';

export type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

export type PaginationData = {
  count: number;
  page: {
    size: number | null;
    count: number;
    total: number;
    current: number | null;
    previous: number | null;
    next: number | null;
  };
  query_param: {
    next: string | null;
    previous: string | null;
  };
  links: {
    next: string | null;
    previous: string | null;
  };
};

export type ResponseData = {
  pagination: PaginationData;
  results: UserData[];
};

export let getUsersUrl = process.env.API_HOST + '/users/';

// Check if running on browser we need to check this for docker for development
if (typeof window !== 'undefined') {
  getUsersUrl = process.env.API_HOST_LOCAL + '/users/';
}

export const buildUrl = (
  baseUrl: string,
  query: ParsedUrlQuery = {}
): string => {
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
  data: ResponseData | null;
}> = async ({ query }) => {
  const url = buildUrl(getUsersUrl, query);
  console.log('GET', url);

  try {
    const { data } = await axios.get(url);
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      data: null,
    },
  };
};

const Users = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [update, setUpdate] = useState(false);
  const [usersRes, setUsersRes] = useState<typeof data | null>(data);

  const { query } = router;

  // Force update user list from client if delete a user
  // from the list
  useEffect(() => {
    if (update) {
      setUpdate(false);
      const url = buildUrl(getUsersUrl, query);
      try {
        axios.get<typeof data>(url).then((res) => setUsersRes(res.data));
      } catch (error) {
        console.log(error);
        setUsersRes(null);
      }
    }
  }, [update, query, usersRes]);

  // Update user list if prop updated by search/filter user list from UI
  useEffect(() => {
    setUsersRes(data);
  }, [data]);

  if (!usersRes) {
    return (
      <Container className="py-4">
        <Alert
          variant="danger"
          style={{
            width: 'fit-content',
            margin: 'auto',
          }}
        >
          {'Server error!, check back after sometime'}
        </Alert>
      </Container>
    );
  }

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
      <UserItemList users={usersRes.results} update={setUpdate} />
      <Paginate paginationData={usersRes.pagination} baseUrl={'/users'} />
    </>
  );
};

export default Users;
