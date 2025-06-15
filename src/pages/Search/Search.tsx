import { ContentSearch } from '@/components/ContentSearch/ContentSearch';
import { MenuContext } from '@/components/context/ToggleMenu/MenuContext';
import { Footer } from '@/components/Footer/Footer';
import { InputSearch } from '@/components/InputSearch/InputSearch';
import { MenuSheet } from '@/components/MenuSheet/MenuSheet';
import { Navbar } from '@/components/Navbar/Navbar';
import { NotFoundBlogs } from '@/components/NotFoundBlog/NotFoundBlog';
import { adjustClamp } from '@/layout/function/function';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useSearchBlogs } from '@/services/hooks/useSearchBlogs';

import React, { useContext } from 'react';

export const Search: React.FC = () => {
  const context = useContext(MenuContext);

  const query = useAppSelector((state) => state.searchBlogs.query);

  const page = 1;
  const limit = 10;

  const { data } = useSearchBlogs(query, page, limit);

  if (!context) {
    throw new Error('MenuContext must be use within a provider');
  }

  const { showSheet } = context;
  return (
    <div className='relative mx-auto my-0 flex h-[100%] min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <Navbar />
      {!showSheet ? (
        <>
          <div
            className='mx-auto block w-full p-4 md:hidden'
            style={{ width: adjustClamp(393, 1248, 1440) }}
          >
            <InputSearch />
          </div>

          {query.length > 0 && data?.data && data.data.length > 0 && (
            <div className='flex h-full flex-1 items-start justify-center'>
              <ContentSearch />
            </div>
          )}

          {query.length > 0 && data?.data && data.data.length < 1 && (
            <div className='flex h-full flex-1 items-center justify-center'>
              <NotFoundBlogs />
            </div>
          )}

          {query.length < 1 && <div className='flex h-full flex-1'></div>}

          <Footer />
        </>
      ) : (
        <MenuSheet />
      )}
    </div>
  );
};
