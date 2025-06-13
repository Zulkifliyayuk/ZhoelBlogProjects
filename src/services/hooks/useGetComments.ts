import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import {
  getBlogComments,
  type GetBlogCommentProps,
} from '../getComments/getComments';

export const useGetComments = (
  idBlog: number,
  options?: Omit<
    UseQueryOptions<GetBlogCommentProps[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetBlogCommentProps[], Error>({
    queryKey: ['comments', idBlog],
    queryFn: () => getBlogComments(idBlog),
    ...options,
  });
};
