import { useQuery } from '@tanstack/react-query';
import { fetchConfiguration } from '@/client/api';

export default () => {
  const { data } = useQuery(['configuration'], fetchConfiguration);
  return {
    image_base_url: data?.images.base_url,
  };
};
