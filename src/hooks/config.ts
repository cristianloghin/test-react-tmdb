import { useQuery } from '@tanstack/react-query';
import { fetchConfiguration } from '@/client/api';

export const useConfig = () => {
  const { data } = useQuery(['configuration'], fetchConfiguration);
  console.log('🤓', data);
  return {
    image_base_url: data?.images.base_url,
  };
};
