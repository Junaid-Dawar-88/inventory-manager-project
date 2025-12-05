import React, { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import axios from "axios";

const Stock_modal = ({ stock, setStock, UpdateStock , setUpdateStock }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const [productList, setProductList] = useState([]);

  const [productId, setProductId] = useState("");
  const [movementType, setMovementType] = useState("");
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try{
      const getProducts = async () => {
        const res = await axios.get("/api/Products");
        setProductList(res.data);
      };
      getProducts();
    } catch (error) {
      alert('check console')
      console.log('get product error in stock modal ')
    }
  }, []);

  useEffect(() => {
    if(UpdateStock){
      setProductId(UpdateStock.productId)
      setMovementType(UpdateStock.movementType)
      setReason(UpdateStock.reason)
      setQuantity(UpdateStock.quantity)
      setNotes(UpdateStock.notes)
      setIsOpen(true)
    }
  } , [UpdateStock])

  const handleStock = async () => {
    try{

      if (!productId || !movementType || !reason || !quantity) {
        return alert("Please fill all required fields");
      }
      
      const exists = stock.find((s: any) => s.productId === Number(productId));
      if (exists) {
        alert("This product already has a stock entry!");
        return;
      }
      
      const stockObj = {
        productId: Number(productId),
        movementType,
        reason,
        quantity: Number(quantity),
        notes,
    };

    const res = await axios.post("/api/Stock", stockObj);
    setStock([...stock, res.data]);
    setProductId("");
    setMovementType("");
    setReason("");
    setQuantity("");
    setNotes("");
    setIsOpen(false);
  } catch (error) {
    alert('check console')
    console.log('handle stock error in stock modal ')
  }
}
  
  const handleUpdate = async () => {
    if(!UpdateStock) return
    const updateData = {
      productId: Number(productId),
      movementType,
      reason,
      quantity: Number(quantity),
      notes,
    };
    const res = await axios.put(`/api/Stock/${UpdateStock.id}` , updateData)
    setStock((prev: any) => prev.map((item: any) => item.id === res.data.id ? res.data : item ))
    setIsOpen(false)
  }

  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-blue-600/50"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-5 h-5" />
        Add Stock Movement
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-[450px] rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Add Stock Movement
              </h1>

              <button
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Product
                </label>
<select
  value={productId}
  onChange={(e) => setProductId(e.target.value)}
  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Choose product...</option>
  {productList.map((p: any) => (
    <option key={p.id} value={p.id}>
      {p.name} (ID: {p.id})
    </option>
  ))}
</select>

              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Movement Type
                </label>
                <select
                  value={movementType}
                  onChange={(e) => setMovementType(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  type="text"
                  placeholder="Enter reason"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="Enter quantity"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg resize-none"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    {UpdateStock ? handleUpdate() :  handleStock(); }
                  }}
                  type="button"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg hover:shadow-blue-600/50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock_modal;
