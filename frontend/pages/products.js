import Link from "next/link";
import React from "react";

const Products = (props) => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="flex flex-wrap w-full md:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Product List - My Shop
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded" />
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Buy from the list of our products
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {props.products.data.map((item) => (
              <div key={item.attributes.slug} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img
                    className="h-50 rounded m-auto mb-8"
                    src={`http://localhost:1337${
                      item.attributes.image.data &&
                      item.attributes.image.data.attributes.url
                    }`}
                    alt="content"
                  />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {item.attributes.category}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {item.attributes.title}
                  </h2>
                  <div className="hidden bg-red-800 bg-purple-800 bg-green-800 bg-blue-800"></div>
                  <button
                    className={`border-2 border-gray-300 ml-1 bg-${item.attributes.color}-800 rounded-full w-6 h-6 focus:outline-none `}
                  ></button>
                  <p className="leading-relaxed text-base">
                    {item.attributes.description}
                  </p>
                  <Link href={`/product/${item.attributes.slug}`}>
                    <button className="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const API_KEY =
    "891b0d2876ca7a477f483b6507d83c92f8dda3e31765dae4f55b6e9b527aaf537250afdce3bcf0972b4824e9dc61d4d7663ba84fadc6e07130f9027d67bfea5d4d95f46f18c48e09dfb0810b3ca931be414b2f97f62421608cef1c12d3b1f4a258c5e1730f1f6e1b08d5b4fd08953bdb0ac202ae2528788f590e583d1ec490e8";
  const URL = "http://127.0.0.1:1337/api/products?populate=*";

  // fetch data from URL with correct scheme and headers
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const products = await res.json();

  return { props: { products: products } };
}

export default Products;
