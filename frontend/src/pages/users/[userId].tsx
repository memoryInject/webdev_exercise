import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUsersUrl } from './index';
import UserItemDetails from '@/components/UserItemDetails';
import SkillEdit from '@/components/SkillEdit';

type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

export const getServerSideProps: GetServerSideProps<{
  data: UserData;
}> = async ({ params }) => {
  let url = `${getUsersUrl}${params!.userId}/`;

  console.log(url);
  const { data } = await axios.get(url);

  return {
    props: {
      data,
    },
  };
};

const UserId = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { userId } = router.query;
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<typeof data>(data);
  // console.log(data);

  // Force to refetch data if user update skills
  useEffect(() => {
    if (update) {
      setUpdate(false);
      // console.log('Update triggerd', update);
      try {
        axios
          .get<typeof data>(`/api/users/${userId}`)
          .then((res) => setUser(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [update, userId]);

  return (
    <>
      <UserItemDetails user={user} />
      <SkillEdit user={user} update={setUpdate} />
    </>
  );
};

export default UserId;
