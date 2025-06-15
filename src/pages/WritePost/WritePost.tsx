import React from 'react';
import { Footer } from '@/components/Footer/Footer';

import { NavbarWriteOrEditPost } from '@/components/Navbar/NavbarWriteOrEditPost';
import { ContentWritePost } from '@/components/ContentWritePost/ContentWritePost';

export const WritePost: React.FC = () => {
  return (
    <div className='relative mx-auto my-0 flex min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <NavbarWriteOrEditPost navText='Write Post' />
      <div className='items-Start flex flex-1 justify-center'>
        <ContentWritePost />
      </div>
      <Footer />
    </div>
  );
};
