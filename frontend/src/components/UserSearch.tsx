import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

const UserSearch = () => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [searchText, setSearchText] = useState('');

  const radios = [
    { name: 'Username', value: '1' },
    { name: 'First name', value: '2' },
    { name: 'Email', value: '3' },
    { name: 'Skill', value: '4' },
  ];

  const queryNames = ['username', 'firstname', 'email', 'skill'];

  // Set the search and filter when there is a query exists
  // TODO: Refactor if checks with hash table lookup
  useEffect(() => {
    if (Object.keys(router.query)) {
      if (router.query.exact) {
        setChecked(true);
      }

      if (router.query.username) {
        setRadioValue('1');
        setSearchText(router.query.username as string);
      }

      if (router.query.firstname) {
        setRadioValue('2');
        setSearchText(router.query.firstname as string);
      }

      if (router.query.email) {
        setRadioValue('3');
        setSearchText(router.query.email as string);
      }

      if (router.query.skill) {
        setRadioValue('4');
        setSearchText(router.query.skill as string);
      }
    }
  }, [router.query]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText) {
      let url = '/users/?';
      url += `${queryNames[parseInt(radioValue) - 1]}=${searchText}`;
      url += `${checked ? '&exact=true' : ''}`;

      router.push(url);
    } else {
      router.push('/users');
    }
  };

  return (
    <Container>
      <Row className="py-2">
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
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <div
        style={{
          background: '#f1f1f1',
          borderRadius: '6px',
          marginTop: '0.3rem',
          paddingTop: '0.5rem',
        }}
      >
        <Row>
          <Col>
            <p className="text-center text-muted">
              Search Filter&nbsp;
              <i className="fa-solid fa-filter"></i>&nbsp;
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="d-flex justify-content-center"
              style={{ paddingBottom: '1.2rem' }}
            >
              <small className="text-muted">filter-by: &nbsp;</small>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    size="sm"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center">
              <small className="text-muted">matching-criteria: &nbsp;</small>
              <ToggleButton
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                size="sm"
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Exact Match
              </ToggleButton>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="py-2"></Row>
    </Container>
  );
};

export default UserSearch;
