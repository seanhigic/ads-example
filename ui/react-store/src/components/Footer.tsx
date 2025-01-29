import { Navbar, Container, Nav } from "react-bootstrap";


function Footer() {
    return (
        <>
            <Navbar expand="lg" className="acme-background w-100" fixed="bottom">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Footer Stuff</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

export default Footer;