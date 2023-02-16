import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import ConfirmModel from './ConfirmModel';

type Data = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

interface Props {
  users: Data[];
  update: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserItemList = ({ users, update }: Props) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(0);

  // Delete user and update the user list
  useEffect(() => {
    if (deleteConfirm) {
      console.log(deleteUserId);
      try {
        axios.delete(`/api/users/${deleteUserId}`).then((_res) => update(true));
      } catch (error) {
        console.log(error);
      }
    }
  }, [deleteConfirm, deleteUserId, update]);

  const editHandler = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const deleteHandler = async (userId: number) => {
    // console.log(userId);
    setDeleteUserId(userId);
    setShowConfirm(true);
  };

  return (
    <Container className="py-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Skills</th>
            <th style={{ paddingRight: '6rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.skills.map((skill) => (
                    <div key={skill} className="d-inline">
                      <Badge>{skill}</Badge>{' '}
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    onClick={() => editHandler(user.id)}
                    className="m-1 btn-info"
                    style={{ height: '42px', width: '42px' }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>{' '}
                  <Button
                    onClick={() => deleteHandler(user.id)}
                    className="m-1 btn-danger"
                    style={{ height: '42px', width: '42px' }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ConfirmModel
        show={showConfirm}
        setShow={setShowConfirm}
        message={'Are you sure want to delete?'}
        confirm={setDeleteConfirm}
      />
    </Container>
  );
};

export default UserItemList;
