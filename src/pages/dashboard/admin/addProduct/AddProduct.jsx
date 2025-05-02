import React, { useState } from 'react'
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { useAddProductMutation } from '@/redux/features/products/products';

const categories = [
    { label: "Select Category", value: "" },
    { label: "Mobile", value: "mobile" },
    { label: "Laptop", value: "laptop" },
    { label: "Processor", value: "processor" },
    { label: "Furniture", value: "furniture" },
    { label: "Motherboard", value: "motherboard" },
    { label: "Monitor", value: "monitor" },
]

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' }
];

const AddProduct = () => {

    const {user} = useSelector(state => state.auth)

    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        color: '',
        rating: 0
    })

    const [image, setImage] = useState("")

    const [AddProduct, {isLoading, error}] = useAddProductMutation();
    if(isLoading) return <Loading/>
    if(error) return <div>Failed to add product</div>

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }


    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.category || !product.price  || !product.color || !product.description) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await AddProduct({...product, image, author: user?._id}).unwrap();
            alert('Product added successfully!');
            setProduct({
                name: '',
                category: '',
                description: '',
                price: '',
                color: '',
                rating: 0
            })
            setImage("")
        } catch (error) {
            console.error('Failed to add product:', error);
        }
        
      
    }

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    type="text"
                    label='Product Name'
                    name="name"
                    placeholder="Ex: Dimond Laptop"
                    value={product.name}
                    onChange={handleChange}
                />

                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />

                <TextInput
                    type="number"
                    label='Price'
                    name="price"
                    placeholder="00"
                    value={product.price}
                    onChange={handleChange}
                />

                <TextInput
                    type="number"
                    label='Rating'
                    name="rating"
                    placeholder="0"
                    value={product.rating}
                    onChange={handleChange}
                />

                {/* image */}
                <UploadImage
                label="Image"
                name="image"
                id="image"
                value={e => setImage(e.target.value)}
                placeholder="Upload image"
                setImage={setImage}
                />

                {/* description */}
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-600'>Description</label>

                    <textarea
                        name="description"
                        id="description"
                        rows="6"
                        value={product.description}
                        onChange={handleChange}
                        className='mt-1 block py-2.5 px-4 w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                       
                   
                </div>

                {/* submit button */}
                <div>
                    <button type='submit' className='mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;