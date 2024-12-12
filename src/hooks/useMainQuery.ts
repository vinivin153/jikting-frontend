import { fetchRecommendTeam } from 'api/main';
import { useQuery } from 'react-query';

export const useRecommendTeamQuery = () => {
  const { data } = useQuery(['recommendTeam'], fetchRecommendTeam, { retry: 0 });

  return data?.data;
};
