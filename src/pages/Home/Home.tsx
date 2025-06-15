import { ContentMostLike } from '@/components/ContentMostLike/ContentMostLike';
import { ContentRecommend } from '@/components/ContentRecommend/ContentRecommend';
import { MenuContext } from '@/components/context/ToggleMenu/MenuContext';
import { Footer } from '@/components/Footer/Footer';
import { MenuSheet } from '@/components/MenuSheet/MenuSheet';
import { Navbar } from '@/components/Navbar/Navbar';
import { adjustClamp } from '@/layout/function/function';

import React, { useContext } from 'react';

export const Home: React.FC = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('MenuContext must be use within a provider');
  }

  const { showSheet } = context;

  return (
    <div className='relative mx-auto my-0 flex min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <Navbar />

      {!showSheet ? (
        <>
          <div
            className='mx-auto my-0 mt-12 mb-6 flex flex-1 flex-wrap items-start justify-between gap-y-6 px-4 md:mb-39 md:px-6'
            style={{ width: adjustClamp(393, 1248, 1440) }}
          >
            {/* left content */}
            <div className='flex-[7.52]'>
              <div className='flex flex-row items-stretch'>
                <ContentRecommend className='flex-[8.93]' />
                <div className='hidden flex-[1.07] items-center justify-center md:flex'>
                  <div className='mx-[48px] h-full w-0.25 bg-neutral-300'></div>
                </div>
              </div>
            </div>
            {/* gap y */}
            <div className='flex w-full md:hidden'>
              <div className='mx-auto h-2.5 w-full bg-neutral-300'></div>
            </div>

            {/* Right Content */}
            <div className='flex-[2.48]'>
              <ContentMostLike />
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <MenuSheet />
      )}
    </div>
  );
};
