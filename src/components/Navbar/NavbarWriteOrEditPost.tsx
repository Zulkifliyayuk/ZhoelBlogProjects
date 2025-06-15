import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setQuerySearch } from '@/redux/slice/searchBlogsSlice';
import { useNavigate } from 'react-router-dom';

import { ActiveUserNavbar } from '../ActiveUser/ActiveUserNavbar';

import ArrowLeftIcon from '@/assets/arrowLeft.png';
import { adjustClamp } from '@/layout/function/function';

type NavbarWriteOrEditPost = {
  navText: string;
};

export const NavbarWriteOrEditPost: React.FC<NavbarWriteOrEditPost> = ({
  navText,
}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  return (
    <div className='w-full border-b border-b-neutral-300'>
      <div
        className='flex-between mx-auto my-0 items-center px-4 py-5 md:px-6 md:py-4'
        style={{ width: adjustClamp(393, 1248, 1440) }}
      >
        <div
          className='text-md md:text-display-xs flex cursor-pointer flex-row items-center gap-[18px] leading-7.5 font-bold md:leading-9'
          onClick={() => {
            navigate('/Home');
            dispatch(setQuerySearch(''));
          }}
        >
          <img
            src={ArrowLeftIcon}
            alt='ArrowLeft'
            className='size-[24px] cursor-pointer'
          />
          {navText}
        </div>
        {token && <ActiveUserNavbar />}
      </div>
    </div>
  );
};
