import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { setIdBlog } from '@/redux/slice/blogDetailsSlice';
import { setIdBlogEdit } from '@/redux/slice/editBlogSlice';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { StatisticDialog } from '../StatisticDialog/StatisticDialog';
import { DeleteBlogDialog } from '../DeleteDialog/DeleteDialog';

import { BlogImage } from '../BlogImage/BlogImage';

type MyBlogCardProps = {
  author: { id: number; name: string; email: string };
  comments: number;
  content: string;
  createdAt: string;
  id: number;
  imgUrl: string;
  likes: number;
  tags: string[];
  title: string;
  page: number;
  limit: number;
};

export const MyBlogsListCardComplete: React.FC<MyBlogCardProps> = ({
  content,
  createdAt,
  id,
  imgUrl,
  tags,
  title,
  page,
  limit,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatisticDialog, setShowStatisticDialog] = useState(false);

  const handleClickDelete = () => setShowDeleteDialog((prev) => !prev);
  const handleClickStatistic = () => setShowStatisticDialog((prev) => !prev);

  const sanitizedContent = DOMPurify.sanitize(content || '');

  const date = new Date(createdAt);
  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const formatted = `${parts.find((p) => p.type === 'day')?.value} ${parts.find((p) => p.type === 'month')?.value} ${parts.find((p) => p.type === 'year')?.value}, ${parts.find((p) => p.type === 'hour')?.value}:${parts.find((p) => p.type === 'minute')?.value}`;

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
        <h3 className='text-md line-clamp-2 leading-7.5 font-bold text-neutral-900 md:text-xl md:leading-8.5'>
          {title}
        </h3>

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

        <div
          className='font-regular mt-3 line-clamp-2 text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className='mt-4 flex flex-row items-center justify-items-start gap-3'>
          <div className='font-regular flex items-center gap-[12px] text-xs leading-6 text-neutral-700'>
            <span>Created {formatted}</span>
            <div className='h-[16px] w-0.25 bg-neutral-300'></div>
            <span>Last updated {formatted}</span>
          </div>
        </div>

        <div className='mt-4 flex flex-row items-center gap-3'>
          <div
            className='text-primary-300 hover:text-primary-300/70 flex-center cursor-pointer text-sm leading-7 font-semibold underline'
            onClick={(e) => {
              e.stopPropagation();
              handleClickStatistic();
            }}
          >
            Statistic
          </div>
          <div className='h-[23px] w-0.25 bg-neutral-300'></div>
          <div
            className='text-primary-300 hover:text-primary-300/70 flex-center cursor-pointer text-sm leading-7 font-semibold underline'
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setIdBlogEdit(id));
              navigate('/EditPost');
            }}
          >
            Edit
          </div>
          <div className='h-[23px] w-0.25 bg-neutral-300'></div>
          <div
            className='flex-center cursor-pointer text-sm leading-7 font-semibold text-[#EE1D52] underline hover:text-[#EE1D52]/70'
            onClick={(e) => {
              e.stopPropagation();
              handleClickDelete();
            }}
          >
            Delete
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <DeleteBlogDialog
          handleClickDelete={handleClickDelete}
          idBlog={id}
          page={page}
          limit={limit}
        />
      )}

      {showStatisticDialog && (
        <StatisticDialog
          handleClickStatistic={handleClickStatistic}
          idBlog={id}
        />
      )}
    </div>
  );
};
