import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleListImg(){
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`https://example-api.com/backend/image`); // 서버의 API 엔드포인트
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched Image" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ScheduleListImg;
