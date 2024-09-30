import { useQuery } from '@tanstack/react-query'
import { getAdoptions } from './api'

export const useAdoptions = () => {
  return useQuery({
    queryKey: ['adoptions'],
    queryFn: getAdoptions,
  })
}
