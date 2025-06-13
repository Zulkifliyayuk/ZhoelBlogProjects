import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setEmailUser } from '@/redux/slice/userSlice';

import { Loading } from '../Loading/Loading';
import { AvatarImage } from '../AvatarImage/AvatarImage';

type UsersProps = {
  emailUser: string;
} & React.ComponentProps<'div'>;

export const Users: React.FC<UsersProps> = ({
  emailUser,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useUserByEmail(emailUser);

  const emailAuth = useAppSelector((state) => state.auth.email);

  if (isLoading) return <Loading />;
  if (!data) return <p>No data user</p>;

  const handleClickUsers = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (emailAuth === emailUser) {
      navigate('/MyProfile');
    } else {
      dispatch(setEmailUser(emailUser));
      navigate('/UsersProfile');
    }
  };

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-3',
        className
      )}
      {...props}
      onClick={handleClickUsers}
    >
      <div className='font-regular text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'>
        <AvatarImage
          src={data.avatarUrl ?? undefined}
          className='h-[40px] w-[40px] min-w-[40px] rounded-full object-cover'
        />
      </div>
      {data.name}
    </div>
  );
};
