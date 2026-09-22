import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getHomeData } from "@/services/games.service";
import { useIgdbGames } from "@/hooks/useIgdbGames";
import { useGenres } from "@/hooks/useGenres";
import {
    useCategoryGames,
    useModeGames,
    usePlatformGames,
} from "@/screens/home/hooks/useGames";
import { Game } from "@/types/game";

import SearchFilters from "./components/SearchFilters";
import SearchHeader from "./components/SearchHeader";
import SearchResultCard from "./components/SearchResultCard";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>();
    const [selectedPlatformId, setSelectedPlatformId] = useState<number | undefined>();
    const [selectedModeId, setSelectedModeId] = useState<number | undefined>();
    const [topRated, setTopRated] = useState<Game[]>([]);
    const { data: genres = [] } = useGenres();
    const { data: results = [], isLoading, isFetching } = useIgdbGames(query);
    const {
        data: genreResults = [],
        isLoading: genreLoading,
        isFetching: genreFetching,
    } = useCategoryGames(selectedGenreId);
    const {
        data: platformResults = [],
        isLoading: platformLoading,
        isFetching: platformFetching,
    } = usePlatformGames(selectedPlatformId);
    const {
        data: modeResults = [],
        isLoading: modeLoading,
        isFetching: modeFetching,
    } = useModeGames(selectedModeId);

    useEffect(() => {
        getHomeData().then((homeData) => setTopRated(homeData.topRated));
    }, []);

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-[#0D0D0D]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <SearchHeader query={query} onChangeQuery={setQuery} />

                {!query.trim() ? (
                    <>
                        <SearchFilters
                            topRated={topRated}
                            genres={genres}
                            genreGames={genreResults}
                            genreLoading={genreLoading}
                            genreFetching={genreFetching}
                            platformGames={platformResults}
                            platformLoading={platformLoading}
                            platformFetching={platformFetching}
                            modeGames={modeResults}
                            modeLoading={modeLoading}
                            modeFetching={modeFetching}
                            selectedModeId={selectedModeId}
                            onModeSelect={(modeId) => {
                                setSelectedModeId(modeId);
                                setSelectedGenreId(undefined);
                                setSelectedPlatformId(undefined);
                                setQuery("");
                            }}
                            selectedPlatformId={selectedPlatformId}
                            onPlatformSelect={(platformId) => {
                                setSelectedPlatformId(platformId);
                                setSelectedGenreId(undefined);
                                setSelectedModeId(undefined);
                                setQuery("");
                            }}
                            selectedGenreId={selectedGenreId}
                            onGenreSelect={(genreId) => {
                                setSelectedGenreId(genreId);
                                setSelectedPlatformId(undefined);
                                setSelectedModeId(undefined);
                                setQuery("");
                            }}
                        />

                    </>
                ) : (
                    <View className="pb-6 pt-5 px-6">
                        <Text className="px-3 text-[10px] text-white">
                            Resultados Más populares para “{query}”
                        </Text>

                        {isLoading || isFetching ? (
                            <ActivityIndicator className="mt-8" color="#F15A35" />
                        ) : results.length ? (
                            results.map((game) => <SearchResultCard key={game.id} game={game} />)
                        ) : (
                            <Text className="px-3 pt-8 text-center text-sm text-[#777777]">
                                No se encontraron juegos.
                            </Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}