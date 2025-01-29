import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Config } from '../../../shared/models/Config';
import { Product } from '../../../shared/models/Product';
import { SponsoredAd } from '../../../shared/models/SponsoredAd';
import { User } from '../../../shared/models/User';
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import ProductResults from './components/ProductResults';
import Sidebar from './components/Sidebar';
import { ConfigController } from './controllers/ConfigController';
import { ProductController } from './controllers/ProductController';
import { ShoppableAdsTrackingController } from './controllers/ShoppableAdsTrackingController';
import { UserController } from './controllers/UserController';
import useLayoutRunOnce from './shared/layoutRunOnceHook';

function App() {

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [sponsoredAds, setSponsoredAds] = useState<SponsoredAd[]>([]);
  const [config, setConfig] = useState<Config>();

  const userController = UserController();
  const configController = ConfigController();
  let shoppableAdsTrackingController = ShoppableAdsTrackingController(undefined);
  const productController = ProductController();
  
  useLayoutRunOnce({
    fn: () => {
        userController.getCurrentUser().then((user) => {
            setCurrentUser(user);
            console.log("assigning user:");
            console.log(user);
        });

        fetchConfig();
        fetchProducts();
        fetchAds();
    }
  });

  const fetchConfig = async () => {
    try {
        const config = await configController.getConfig()
        setConfig(config);
        shoppableAdsTrackingController = ShoppableAdsTrackingController(config);            
    } catch (error) {
        console.error('Error fetching config:', error);
    }
};

  const fetchProducts = async () => {
    try {
        setProducts(await productController.getProducts());
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchAds = async () => {
    try {
        setSponsoredAds(await shoppableAdsTrackingController.loadSponsoredAds());
    } catch (error) {
        console.error('Error fetching sponsored ads:', error);
    }
};
      
return (
    <>
        <Header currentUser={currentUser}></Header>
        <Container fluid className="content m-0 p-0">
            <Row>
                <Col lg={2} id="sidebar-wrapper">
                    <Sidebar />
                </Col>
                <Col lg={10} id="page-content-wrapper">
                    <ProductResults 
                        config={config}
                        currentUser={currentUser} 
                        products={products} 
                        sponsoredAds={sponsoredAds}></ProductResults>
                </Col>
            </Row>
        </Container>
        <Footer></Footer>
    </>
)
}

export default App
