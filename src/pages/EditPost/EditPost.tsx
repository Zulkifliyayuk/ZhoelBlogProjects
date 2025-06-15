import React from 'react';
import { Footer } from '@/components/Footer/Footer';

import { NavbarWriteOrEditPost } from '@/components/Navbar/NavbarWriteOrEditPost';
import { ContentEditPost } from '@/components/ContentEditPost/ContentEditPost';

export const EditPost: React.FC = () => {
  return (
    <div className='relative mx-auto my-0 flex min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <NavbarWriteOrEditPost navText='Edit Post' />
      <div className='items-Start flex flex-1 justify-center'>
        <ContentEditPost />
      </div>
      <Footer />
    </div>
  );
};
