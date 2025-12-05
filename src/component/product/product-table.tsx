import React, { useEffect, useState } from 'react'
import Product_modal from './product-modal'
import axios from 'axios'
import { Edit2, Trash2, Search } from 'lucide-react'

//  { ======================= INTERFACE ===================== }
 interface productArr {
    id: number
    name: string
    sku: string
    supplier: string
    description: string
    price: number
    quantity: number
 }

const Product_table = () => {
    //  { ======================== HOOKS ======================== }
     const [Product , setProducts] = useState<productArr[]>([])
     const [updateProduct , setUpdateProduct] = useState('')
     const [searchTerm, setSearchTerm] = useState('')

  //  { =============================== GET ALL PRODUCTS =============== }
     const getAllData = async () => {
      try{
        const res = await axios.get('/api/Products')
        setProducts(res.data)
      } catch(error) {
        console.log('product ui error in get all product fn ')
      }
     }
  useEffect(() => {
    getAllData()
  } , [])

  // { ===================================== DELETE FUNCTION ==================== }
  const handleDelete = async (id: number) => {
    try{
        const confirmProduct = confirm('Are you sure to delete the product')
        if(!confirmProduct) return
        const res = await axios.delete(`/api/Products/${id}`)
        setProducts((prev: any) => prev.filter((item: any) => item.id !== res.data.id))
    } catch(error){
        console.log('ui delete error')
    }
  }

  // { ====================================== FILTER PRODUCT ======================== }
  const filteredProducts = Product.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-fullmx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your inventory and products</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col gap-4 items-stretch  justify-between">
            <div className="relative flex-1  max-w-md">
              <Search className="absolute left-3 top-8 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <Product_modal updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} Product={Product} setProducts={setProducts} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((prod: any) => (
                  <tr key={prod.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{prod.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-800 rounded text-xs font-mono">{prod.sku}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{prod.supplier}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{prod.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${prod.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        prod.quantity > 20 ? 'bg-green-100 text-green-800' : 
                        prod.quantity > 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {prod.quantity} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setUpdateProduct(prod)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(prod.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Search className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">No products found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{Product.length}</span> products
        </div>
      </div>
    </div>
  )
}

export default Product_table