import EditSpaceForm from '@/components/dashboard/EditSpace'
import { getAllSpaces } from '@/lib/actions';
import React from 'react'

const Page = ({params}) => {


  return (
    <EditSpaceForm spaceId={params.id}/>
  )
}

export default Page