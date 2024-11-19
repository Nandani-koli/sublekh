import React from 'react';
import ReviewForm from '@/components/dashboard/ReviewForm';

const Page = async ({ params }) => {


    return (
        <div>
            <ReviewForm  domain={params.domain} /> 
  
        </div>
    );
};

export default Page;