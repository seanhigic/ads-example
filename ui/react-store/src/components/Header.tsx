//import { Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Form, Row, Col, InputGroup, Button, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Form from 'react-bootstrap/Form';
import "./Header.css"
import { User } from '../../../../shared/models/User';

interface HeaderProps {
    currentUser: User | undefined;
}

function Header({currentUser} : HeaderProps) {

    function hasCurrentUser() : boolean {
        return currentUser !== undefined;
    }

    function getCurrentUser() : User | undefined{
        return currentUser;
    }

    return (
        <>
            <Navbar className="acme-background ps-3" fixed="top">
                <Navbar.Brand href="/"><img className="acme-logo" src="/acme-logo.png"></img>
                    <div className="acme-brandname">ACME Foods</div>
                    <div className="acme-tagline">Food for Folks on the Move...</div>
                </Navbar.Brand>
                <Container className="w-100">
                    <Navbar.Toggle />
                    <Form className='search-form'>
                        <Row>
                            <Col xs="auto" lg="auto">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search Products"
                                        aria-label="Search"
                                    />
                                    <Button type="button"><span className="bi bi-search"></span></Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>

                    <Navbar.Collapse className="justify-content-end">
                        { hasCurrentUser() ? (
                            <Navbar.Text>
                                Signed in as: <a href="#login" title={ getCurrentUser()?.userId }>{ getCurrentUser()?.firstName }</a>
                            </Navbar.Text>
                        ) : (
                            <Navbar.Text>
                                Not Signed In
                            </Navbar.Text>
                        ) }
                    </Navbar.Collapse>
                    <Nav.Link href="#cart" className="ps-3">
                        <Button type="button"><span className="bi bi-cart"> Cart</span></Button>
                    </Nav.Link>
                </Container>
            </Navbar>

            {/*             <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Form className='d-flex'>
                    <Row>
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search Products"
                                    className="mr-sm-5"
                                />
                                <Button type="button"><span className="bi bi-search"></span></Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <Nav className="ms-0">
                    <Nav.Link href="#home">Sign-In</Nav.Link>
                    <Nav.Link href="#link">Cart</Nav.Link>
                </Nav>
            </Navbar> */}
        </>
    )
}

export default Header;