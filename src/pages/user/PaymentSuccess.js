import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0]
  const referenceNum = seachQuery.get("reference")

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-700">Reference No.{referenceNum}</p>
        
      </div>
    </div>
  );
};

export default PaymentSuccess;
