'use client'
import { Button } from '@/components/ui/button'
import CabinTable from '@/components/ui/CabinTable'
import CreateCabinForm from '@/components/ui/CreateCabinForm'
import React, { useState } from 'react'

const page = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold '>
          All Cabins
        </h1>
        <p>Filter / Sort</p>
      </div>
      <div className='p-4'>
        <CabinTable />
        <Button onClick={() => setShowForm(show => !show)} className="w-full my-6">Add New Cabin</Button>
        {showForm && <CreateCabinForm />}
      </div>
    </div >
  )
}

export default page