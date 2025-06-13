import React from 'react';
import loading from '@/assets/loading.gif';

export const Loading: React.FC = () => {
  return (
    <div className='flex-center'>
      <img src={loading} alt='Loading...' />
    </div>
  );
};
