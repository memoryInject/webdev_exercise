import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';

type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

const UserCreationForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const { data } = await axios.post<UserData>('/api/users', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
      });
      router.push(`/users/${data.id}`);
    } catch (err) {
      console.log(err);
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <Container className="py-4">
      <h5 className="text-center text-dark">Create User</h5>
      {errorMessage && (
        <Alert
          variant="danger"
          style={{
            width: 'fit-content',
            margin: 'auto',
          }}
        >
          {errorMessage}
        </Alert>
      )}
      <Form
        onSubmit={submitHandler}
        style={{
          width: 'fit-content',
          margin: 'auto',
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-warning">
            Username must be unique
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UserCreationForm;
