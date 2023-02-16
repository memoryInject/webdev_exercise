import React from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';

type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
};

type Props = {
  user: UserData;
};

const UserItemDetails = ({
  user: { id, username, email, first_name, last_name },
}: Props) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <h5 className="text-center text-dark">User Profile</h5>
          <ListGroup
            style={{
              maxWidth: '50rem',
              margin: 'auto',
            }}
          >
            <ListGroup.Item>
              <Row>
                <Col>
                  <span className="text-muted">User Id:</span>
                </Col>
                <Col>{id}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <span className="text-muted">Username: </span>
                </Col>
                <Col>{username}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <span className="text-muted">First name: </span>
                </Col>
                <Col>{first_name}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <span className="text-muted">Last name: </span>
                </Col>
                <Col>{last_name}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <span className="text-muted">Email: </span>
                </Col>
                <Col>{email}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserItemDetails;
