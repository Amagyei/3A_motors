import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceRecordDetails } from "../../../../api/serviceRecordAPI"; // Replace with your API function

const ServiceRecordDetails = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchServiceRecordDetails(id); // Fetch details for the specific record
        setServiceDetails(response);
      } catch (error) {
        console.error("Error fetching service record details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!serviceDetails) {
    return <p>Service record not found.</p>;
  }

  return (
    <div>
      <h1>Service Record Details</h1>
      <p><strong>ID:</strong> {serviceDetails.id}</p>
      <p><strong>Name:</strong> {serviceDetails.name}</p>
      <p><strong>Description:</strong> {serviceDetails.description}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default ServiceRecordDetails;