import Reviews from '@/components/dashboard/Reviews'
import React from 'react'

const Page = ({params}) => {
  return (
    <Reviews spaceId={params.id} />
  )
}

export default Page