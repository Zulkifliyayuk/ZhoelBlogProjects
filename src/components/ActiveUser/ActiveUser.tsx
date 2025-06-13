import React from 'react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';

import { Loading } from '../Loading/Loading';
import { AvatarImage } from '../AvatarImage/AvatarImage';

export const ActiveUser: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data, isLoading } = useUserByEmail(emailUser);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <p>No data user</p>;
  }

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-3',
        className
      )}
      {...props}
    >
      <div>
        <AvatarImage
          src={data.avatarUrl ?? undefined}
          className='h-[40px] w-[40px] min-w-[40px] rounded-full object-cover'
        />
      </div>
      {data.name}
    </div>
  );
};
