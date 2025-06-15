import React from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useGetComments } from '@/services/hooks/useGetComments';
import { useGetLikes } from '@/services/hooks/useGetLikes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setIdBlog } from '@/redux/slice/blogDetailsSlice';
import { Likes } from '../Likes/Likes';
import { Users } from '../ActiveUser/Users';

import likeIcon from '@/assets/like.png';
import commentIcon from '@/assets/commentIcon.png';

import { BlogImage } from '../BlogImage/BlogImage';

type RecommendedCardProps = {
  author: { id: number; name: string; email: string };
  comments: number;
  content: string;
  createdAt: string;
  id: number;
  imgUrl: string;
  likes: number;
  tags: string[];
  title: string;
};

export const BlogsListCardComplete: React.FC<RecommendedCardProps> = ({
  author,
  content,
  createdAt,
  id,
  imgUrl,
  tags,
  title,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: dataCommentsCheckLenght } = useGetComments(id);
  const { data: dataLikesCheckLenght } = useGetLikes(id);

  const token = useAppSelector((state) => state.auth.token);

  const lengthComments = dataCommentsCheckLenght?.length ?? 0;
  const lengthLikes = dataLikesCheckLenght?.length ?? 0;

  const sanitizedContent = DOMPurify.sanitize(content || '');

  const date = new Date(createdAt);
  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date);

  const day = parts.find((p) => p.type === 'day')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const year = parts.find((p) => p.type === 'year')?.value;
  const formatted = `${day} ${month} ${year}`;

  return (
    <div
      id={id.toString()}
      className='flex w-full cursor-pointer flex-row items-start justify-start gap-6 overflow-hidden'
      onClick={() => {
        dispatch(setIdBlog(id));
        navigate('/BlogDetails');
      }}
    >
      <div className='hidden h-[258px] w-[340px] rounded-[6px] bg-neutral-400 lg:block'>
        <BlogImage
          src={imgUrl}
          className='h-[258px] min-w-[340px] overflow-hidden rounded-[6px] object-cover'
        />
      </div>
      <div className='flex-1 overflow-hidden'>
        {/* title */}
        <h3 className='text-md line-clamp-2 leading-7.5 font-bold text-neutral-900 md:text-xl md:leading-8.5'>
          {title}
        </h3>

        {/* tags */}
        <div className='mt-3 flex w-full flex-row flex-wrap items-center justify-items-start gap-2'>
          {tags.map((tag, index) => (
            <div
              key={index}
              className='font-regular rounded-[8px] border border-neutral-300 px-2 py-0.5 text-xs leading-6 text-neutral-900'
            >
              {tag}
            </div>
          ))}
        </div>

        {/* content */}
        <div className='font-regular mt-3 line-clamp-2 text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>

        {/* author & date */}
        <div className='mt-4 flex flex-row items-center justify-items-start gap-3'>
          <Users emailUser={author.email} />
          <div className='size-1 rounded-full bg-neutral-400' />
          <div className='font-regular text-sm leading-7 text-neutral-600'>
            {formatted}
          </div>
        </div>

        {/* likes & comments */}
        <div className='mt-4 flex flex-row items-center gap-5'>
          {token ? (
            <Likes className='cursor-pointer' idBlog={id} />
          ) : (
            <div className='font-regular flex flex-row items-center gap-1.5 text-xs leading-6 text-neutral-600 md:text-sm'>
              <img src={likeIcon} alt='like icon' className='size-5' />
              <span>{lengthLikes}</span>
            </div>
          )}
          <div className='font-regular flex flex-row items-center gap-1.5 text-xs leading-6 text-neutral-600 md:text-sm'>
            <img src={commentIcon} alt='comment icon' className='size-5' />
            {lengthComments}
          </div>
        </div>
      </div>
    </div>
  );
};
