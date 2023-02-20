import { useQuery } from '@tanstack/react-query';
import { fetchConfiguration } from '@/client/api';

export const useConfig = () => {
  const { data } = useQuery(['configuration'], fetchConfiguration);
  return data;
};
