import { useCallback, useEffect, useState } from "react";

import { getHomeData } from "@/services/games.service";
import { HomeData } from "@/types/game";

export function useHomeGames() {
  const [data, setData] = useState<HomeData | null>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadHome = useCallback(async () => {
    try {
      setError(null);

      const response = await getHomeData();

      setData(response);
    } catch (error) {
      console.error(error);

      setError("No se pudo cargar la información.");
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  const refresh = async () => {
    setRefreshing(true);

    await loadHome();
  };

  return {
    data,
    loading,
    refreshing,
    error,
    refresh,
  };
}