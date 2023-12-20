import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { HotPostsType } from '../../../model/interface';

const getHotPosts = async (
  districtName: string | undefined,
): Promise<HotPostsType[]> => {
  const params =
    districtName !== '전체' ? { districtName, limit: 9 } : { limit: 9 };

  const response = await instance.get(`/main/popular`, { params });
  console.log(response.data);
  return response.data;
};

const useGetHotPostsQuery = (districtName: string | undefined) =>
  useQuery('hotPosts', () => getHotPosts(districtName));

export default useGetHotPostsQuery;
