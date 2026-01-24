import EditSpaceForm from '@/components/dashboard/EditSpace'
import { getAllSpaces } from '@/lib/actions';
import React from 'react'

const Page = async ({params}) => {
  const { id } = await params;
  
  let initialData = null;
  try {
    const { space } = await getAllSpaces(null, id);
    if (space) {
      initialData = JSON.parse(JSON.stringify(space));
    }
  } catch (error) {
    console.error('Error fetching space:', error);
  }

  return (
    <EditSpaceForm spaceId={id} defaultData={initialData}/>
  )
}

export default Page
