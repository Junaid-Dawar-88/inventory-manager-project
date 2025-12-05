import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Product_modal = ({Product , setProducts , updateProduct , setUpdateProduct}: any ) => {
  const [product_Modal, setProduct_Modal] = useState(false);
  const OpenModal = () => setProduct_Modal(true);
  const CloseModal = () => setProduct_Modal(false);
     const [name , setName] = useState('')
     const [sku , setSku] = useState('')
     const [supplier , setSupplier] = useState('')
     const [description , setDescription ] = useState('')
     const [price  , setPrice ] = useState('')
     const [quantity , setQuantity] = useState('')

     useEffect(() => {
        if(updateProduct){
            setName(updateProduct.name)
            setSku(updateProduct.sku)
            setSupplier(updateProduct.supplier)
            setDescription(updateProduct.description)
            setPrice(updateProduct.price)
            setQuantity(updateProduct.quantity)
            OpenModal()
        }
     } , [updateProduct])

      const  clearFn = () => {
        setName('')
            setSku('')
            setSupplier('')
            setDescription('')
            setPrice('')
            setQuantity('')
      }

    const handleProduct = async () => {
      
     const exists = Product.find((s: any) => s.name.toLowerCase() === name.toLowerCase());
if (exists) {
  alert("Product name already exists!");
  return;
}


        try{

            if(!name || !sku || !supplier || !description || !price || !quantity) {
                return alert('please fill the input field')
            }
            const products = {
                id: Date.now(),
                name: name,
                sku: sku,
                supplier: supplier,
                description: description,
                price: Number(price),
                quantity: Number(quantity)
            }     
            const res = await  axios.post('/api/Products', products)
            const productContent = res.data
            setProducts([ ...Product , productContent ])
            clearFn()
            CloseModal()
        } catch(error) {
            console.log('ui post error')
        }
    }

    const handleUpdate = async () => {
        if(!updateProduct) return
        try{
            const updateData = { name , sku , supplier , description , price: Number(price) ,
                quantity: Number(quantity)}
            const res = await axios.put(`/api/Products/${updateProduct.id}` , updateData)
            setProducts((prev: any) => prev.map((item: any) => item.id === res.data.id ? res.data : item))
        } catch(error) {
            console.log('ui update method error')
        }
        CloseModal()
        clearFn()
    }

  return (
    <div className="w-full py-6">
      <button
        onClick={OpenModal}
        className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 duration-200 font-medium"
      >
        + Add Product
      </button>

      {product_Modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Add New Product
              </h1>
              <button
                onClick={CloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                  Product Name
                </label>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

     
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                    Product SKU
                  </label>
                  <input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                    Supplier
                  </label>
                  <input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                    type="text"
                    name="supplier"
                    placeholder="Supplier"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                  Description
                </label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  placeholder="Enter product description"
                  className="w-full px-4 py-3 h-24 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                    Price
                  </label>
                  <input
                  value={price}
                  onChange={(e) =>  setPrice(e.target.value)}
                    type="number"
                    name="price"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                    Quantity
                  </label>
                  <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    name="quantity"
                    placeholder="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={CloseModal}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                onClick={(e) => {
                    e.preventDefault()
                    { updateProduct ? handleUpdate() :  handleProduct() }
                }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_modal;