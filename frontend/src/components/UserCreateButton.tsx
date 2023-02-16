import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

const UserCreateButton = () => {
  const router = useRouter();
  return (
    <Container>
      <Row>
        <Col>
          <Button
            className="float-end btn-dark"
            onClick={() => router.push('/users/new')}
          >
            <i className="fa-solid fa-user-plus"></i>&nbsp;Create User
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCreateButton;
