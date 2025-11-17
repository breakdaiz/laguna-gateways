import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'
import React from 'react'

function AdminPackagesList() {
  return (
    <div>
      <div className="flex justify-between items-center" >
        <PageTitle title='Packages'/>
        <Button> 
          <Link href="/admin/packages/add" >
          Add package
          </Link>
             </Button> 
      </div>
    </div>
  )
}

export default AdminPackagesList