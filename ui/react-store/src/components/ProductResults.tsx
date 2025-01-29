import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { Product } from "../../../../shared/models/Product"

import "./ProductResults.css"
import { SponsoredAd } from "../../../../shared/models/SponsoredAd";
import { User } from "../../../../shared/models/User";
import { Config } from "../../../../shared/models/Config";

interface ProductResultsProps {
    config: Config | undefined,
    currentUser: User | undefined,
    products: Product[],
    sponsoredAds: SponsoredAd[] | undefined,
}

function ProductResults({ config, currentUser, products, sponsoredAds }: ProductResultsProps) {

    function getSponsoredAdForProduct(product: Product): SponsoredAd | undefined {
        return sponsoredAds ? sponsoredAds.find(ad => ad['productId'] == product.id) : undefined;
    }

    return (
        <>
            <Container className="results">
                <div className="products-wrapper">
                    <div className="products">
                        {products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                config={config}
                                currentUser={currentUser} 
                                sponsoredAd={getSponsoredAdForProduct(product)} 
                                product={product}
                                isAdded={false} />
                        ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductResults;