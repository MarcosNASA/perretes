import { useQuery } from '@tanstack/react-query'
import { getGatetes } from './api'

export function useGatetes() {
  return useQuery({
    queryKey: ['gatetes'],
    queryFn: getGatetes,
    refetchOnMount: false,
  })
}
