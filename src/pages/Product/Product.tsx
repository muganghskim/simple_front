import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
// import Footer from "../Common/Footer"
import axios from "axios";

interface Product {
  pdImg: string;
  pdName: string;
  pdNo: number;
  pdPrice: number;
}

// const products = [
//   {
//     id: 1,
//     name: "Earthen Bottle",
//     href: "/product/1",
//     price: "$48",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
//     imageAlt:
//       "Tall slender porcelain bottle with natural clay textured body and cork stopper."
//   },
//   {
//     id: 2,
//     name: "Nomad Tumbler",
//     href: "/product/2",
//     price: "$35",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
//     imageAlt:
//       "Olive drab green insulated bottle with flared screw lid and flat top."
//   },
//   {
//     id: 3,
//     name: "Focus Paper Refill",
//     href: "/product/3",
//     price: "$89",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
//     imageAlt:
//       "Person using a pen to cross a task off a productivity paper card."
//   },
//   {
//     id: 4,
//     name: "Machined Mechanical Pencil",
//     href: "/product/4",
//     price: "$35",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
//     imageAlt:
//       "Hand holding black machined steel mechanical pencil with brass tip and top."
//   }
//   // More products...
// ];

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get("http://localhost:8096/api/products");
      setProducts(response.data);
    };

    getAllProducts();
  }, []);

  return (
    <>
      <Header></Header>
      {/* <div className="h-screen top-0 left-0">
        <p className="h-screen fixed">아아</p> */}
      {/* <Header /> */}
      {/* </div> */}
      <div className="ml-64 overflow-auto bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a
                key={product.pdNo}
                href={`/product/${product.pdNo}`}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.pdImg}
                    alt={product.pdName}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.pdName}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.pdPrice}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Product;
