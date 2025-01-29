import { Nav } from "react-bootstrap";
import './Sidebar.css'

function Sidebar() {

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar acme-background"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <label className="sidebar-label">Browse:</label>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Dairy</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Produce</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Bakery</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Beverages</Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};

export default Sidebar;