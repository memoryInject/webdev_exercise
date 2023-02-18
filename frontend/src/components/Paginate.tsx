import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { PaginationData } from '@/pages/users';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  paginationData: PaginationData;
  baseUrl: string;
};

const buildUrl = (baseUrl: string, query: ParsedUrlQuery) => {
  let url = baseUrl + '?';
  // build the query param for filtering users
  if (Object.keys(query).length) {
    for (let key in query) {
      if (key != 'page') {
        url += `${key}=${query[key]}&`;
      }
    }
  }
  return url + 'page=';
};

const Paginate = ({ paginationData, baseUrl }: Props) => {
  const router = useRouter();
  const { page } = paginationData;
  const url = buildUrl(baseUrl, router.query);

  const getItem = () => {
    const itemList = [];
    for (let num = 0; num < page.total; num++) {
      itemList.push(num);
    }

    return itemList.map((x) => (
      <li
        key={x}
        className={`page-item ${page.current === x + 1 ? 'active' : ''}`}
      >
        <Link href={`${url}${x + 1}`} className="page-link">
          {x + 1}
        </Link>
      </li>
    ));
  };

  return page.total > 1 ? (
    <Container>
      <Row className="py-4">
        <Col className="d-flex justify-content-center">
          <ul className="pagination">{getItem()}</ul>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

export default Paginate;
