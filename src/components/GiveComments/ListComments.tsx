import { useGetComments } from '@/services/hooks/useGetComments';
import React from 'react';
import { cn } from '@/lib/utils';
import { AvatarImage } from '../AvatarImage/AvatarImage';
import { Loading } from '../Loading/Loading';

type ListCommentsProps = {
  idBlog: number;
  limit: number | 'all';
} & React.ComponentProps<'div'>;

type CommentsCardProps = {
  author: {
    id: number;
    name: string;
    email: string;
    password: string;
    headline: string | null;
    avatarUrl: string | null;
  };
  content: string;
  createdAt: string;
  isLastIndex: boolean;
};

export const ListComments: React.FC<ListCommentsProps> = ({
  idBlog,
  limit,
  className,
  ...props
}) => {
  const { data: dataComments, isLoading, isError } = useGetComments(idBlog);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching data</p>;
  if (!dataComments) return <p>No blog comments data found</p>;

  const displayedComments =
    limit === 'all'
      ? [...dataComments].reverse()
      : [...dataComments].reverse().slice(0, limit);

  return (
    <div className={cn('', className)} {...props}>
      {displayedComments.map((comment, index, arr) => (
        <div key={comment.id}>
          <CommentsCard
            author={comment.author}
            content={comment.content}
            createdAt={comment.createdAt}
            isLastIndex={index === arr.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export const CommentsCard: React.FC<CommentsCardProps> = ({
  author,
  content,
  createdAt,
  isLastIndex,
}) => {
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
    <div>
      <div
        className={cn(
          'flex flex-col gap-2 py-3',
          !isLastIndex && 'border-b border-neutral-300'
        )}
      >
        <div className='flex flex-row gap-3'>
          <AvatarImage
            src={author.avatarUrl ?? undefined}
            className='size-12 rounded-full'
            alt='avatar'
          />

          <div>
            <p>{author.name}</p>
            <p>{formatted}</p>
          </div>
        </div>
        <div className='overflow-hidden break-words'>{content}</div>
      </div>
    </div>
  );
};
