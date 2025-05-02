import React from 'react';
import { Link } from 'react-router-dom'; 
import category1 from "../../assets/categories/mobile.jpg";
import category2 from "../../assets/categories/laptop.jpg";
import category3 from "../../assets/categories/processor.jpg";
import category4 from "../../assets/categories/furniture.jpg";
import category5 from "../../assets/categories/motherboard.jpg";
import category6 from "../../assets/categories/monitor.jpg";

const categories = [
    { id: 1, name: "Mobile", path: 'mobile', image: category1 },
    { id: 2, name: "Laptop", path: 'laptop', image: category2 },
    { id: 3, name: "Processor", path: 'processor', image: category3 },
    { id: 4, name: "Furniture", path: 'furniture', image: category4 },
    { id: 5, name: "Motherboard", path: 'motherboard', image: category5 },
    { id: 6, name: "Monitor", path: 'monitor', image: category6 }
];

const Categories = () => {
    return (
        <main className='container mx-auto px-4 py-8'>
            <section className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6'>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/categories/${category.path}`}
                        className='flex flex-col items-center justify-center text-center'
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className='w-20 h-20 object-cover rounded-full hover:scale-110 duration-300 transition-all'
                        />
                        <div className='p-4'>
                            <h4 className='text-center hover:text-primaryDark'>
                                {category.name}
                            </h4>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
};

export default Categories;

























// import { useFetchAllCategoriesQuery } from '@/redux/features/products/products'
// import React from 'react'

// const Categories = () => {
//   // Use the query hook to fetch data
//   const { data, error, isLoading, isError } = useFetchAllCategoriesQuery();

//   // Loading state
//   if (isLoading) {
//     return <div>Loading categories...</div>;
//   }

//   // Error state
//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }
//   return (
//     <div>
//     <h1>Categories</h1>
//     <ul>
//       {data?.map((category) => (
//         <li key={category.id}>{category.name}</li>
//       ))}
//     </ul>
//   </div>
//   )
// }

// export default Categories;





// import { useFetchAllCategoriesQuery } from '@/redux/features/products/products';
// import React from 'react';

// const Categories = () => {
//   const { data, error, isLoading, isError } = useFetchAllCategoriesQuery();
//   console.log('Data:', data);

//   if (isLoading) {
//     return <div>Loading categories...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Categories</h1>
//       <ul>
//         {data?.map((category) => (
//           <li key={category.id}>{category.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Categories;

