import React from 'react'
import AddProductForm from './AddProduct'

export function Admin () {
  return (
     <Routes path="/AdminHome">
        <Route path="/users/" element={<h1>Users</h1>} />
        <Route path="/products" element={<AddProductForm />} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct/>} />
      </Routes>
  )
}

export default Admin