import React from 'react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useGetLikes } from '@/services/hooks/useGetLikes';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import { usePostLike } from '@/services/hooks/usePostLike';

import likeIcon from '@/assets/like.png';
import likedBlueIcon from '@/assets/likedBlue.png';

type LikesProps = {
  idBlog: number;
} & React.ComponentProps<'div'>;

export const Likes: React.FC<LikesProps> = ({
  idBlog,
  className,
  ...props
}) => {
  const { data: dataLikes, isLoading, isError } = useGetLikes(idBlog);
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data: dataActiveUser } = useUserByEmail(emailUser);
  const mutation = usePostLike();

  if (!mutation) return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data likes</p>;
  if (!dataActiveUser) return <p>No user data found</p>;
  if (!dataLikes) return <p>No likes data found</p>;

  const isLiked = dataLikes.some((like) => like.id === dataActiveUser.id);

  const handleClickLike = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    mutation.mutate({ idBlog });
  };

  return (
    <div className={cn('', className)} {...props}>
      <div className='font-regular flex cursor-pointer flex-row items-center gap-1.5 text-sm leading-6 text-neutral-600'>
        <img
          src={isLiked ? likedBlueIcon : likeIcon}
          alt='like icon'
          className='size-5'
          onClick={handleClickLike}
        />
        <span>{dataLikes.length}</span>
      </div>
    </div>
  );
};
