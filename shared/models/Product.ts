

interface Rating {
    rate: number,
    count: number
}

interface Product {
    id :number
    name :string
    price :number
    image :string
    rating :Rating 

}

export type {
    Product,
    Rating
} 