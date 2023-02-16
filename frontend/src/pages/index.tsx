import Image from 'next/image';
import { useRouter } from 'next/router'
import { Container, Button, Row, Col } from 'react-bootstrap';
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from '@/styles/Home.module.css';
import sidePic from '../../public/Containers-illustration.svg';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter()

  return (
    <>
        <div className="app-bg">
          <Container>
            <Row>
              <Col>
                <h1
                  className="px-3"
                  style={{
                    paddingTop: '8rem',
                  }}
                >
                  Welcome to user management system
                </h1>
                <p className="px-3">Review and manage platform users</p>
                <Button onClick={() => router.push("/users")} className="mx-3 btn-success">Manage Users</Button>
              </Col>
              <Col>
                <Image
                  src={sidePic}
                  alt="Picture of the weights"
                  width={300}
                  style={{
                    position: 'relative',
                    top: '50%',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <hr />
          <h3 className='p-1 text-center fw-bold text-primary'>Our Story</h3>
          <p className='m-4 p-4 text-muted'>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </p>
        </Container>
    </>
  );
}
