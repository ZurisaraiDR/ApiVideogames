import { useQuery } from "@tanstack/react-query";

import { getGenres } from "@/screens/home/services/categories.service";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: ({ signal }) => getGenres(signal),
    staleTime: 1000 * 60 * 60,
  });
}
