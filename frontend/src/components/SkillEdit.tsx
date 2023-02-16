import React, { useState } from 'react';
import { Container, Row, Col, Badge, Form, Button } from 'react-bootstrap';
import axios from 'axios';

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
  update: React.Dispatch<React.SetStateAction<boolean>>;
};

const SkillEdit = ({ user: { skills, id }, update }: Props) => {
  const [addText, setAddText] = useState('');

  const removeHandler = async (skill: string) => {
    const filteredSkills = skills.filter((s) => s !== skill);
    try {
      await axios.put(`/api/users/${id}`, { skills: filteredSkills });
      update(true);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSkills = [...skills, addText];
    try {
      await axios.put(`/api/users/${id}`, { skills: newSkills });
      update(true);
    } catch (error) {
      console.log(error);
    }
    setAddText('');
  };

  return (
    <Container className="py-4">
      <Row className="py-4">
        <h5 className="text-dark text-center"> Skills </h5>
        <Col>
          <Form
            className="d-flex"
            style={{
              position: 'relative',
              margin: 'auto',
              maxWidth: 'fit-content',
            }}
            onSubmit={(e) => submitHandler(e)}
          >
            <Form.Control
              type="text"
              placeholder="Add Skill"
              className="me-2"
              aria-label="Add"
              value={addText}
              onChange={(e) => setAddText(e.target.value)}
            />
            <Button type="submit" variant="outline-info">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      {skills.map((skill) => (
        <Row key={skill}>
          <Col>
            <h4 className="px-3 text-center">
              <Badge bg="info">
                {skill}&nbsp;&nbsp;
                <i
                  className="fa-solid fa-circle-xmark text-danger"
                  style={{
                    cursor: 'pointer',
                    background: '#f1f1f1',
                    borderRadius: '30px',
                    width: '18px',
                    height: 'fit-content',
                  }}
                  onClick={() => removeHandler(skill)}
                ></i>
              </Badge>
            </h4>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default SkillEdit;
