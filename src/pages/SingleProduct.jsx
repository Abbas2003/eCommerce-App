import React from 'react'
import { useParams } from 'react-router';

const SingleProduct = () => {

  const params = useParams()
  console.log(params);
  

  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct;