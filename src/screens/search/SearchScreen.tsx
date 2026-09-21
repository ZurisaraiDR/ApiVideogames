import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getHomeData, searchGames } from "@/services/games.service";
import { Game } from "@/types/game";

import SearchFilters from "./components/SearchFilters";
import SearchHeader from "./components/SearchHeader";
import SearchResultCard from "./components/SearchResultCard";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Game[]>([]);
    const [topRated, setTopRated] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getHomeData().then((homeData) => setTopRated(homeData.topRated));
    }, []);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setLoading(Boolean(query.trim()));
            const nextResults = await searchGames(query);
            setResults(nextResults);
            setLoading(false);
        }, 180);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-[#0D0D0D]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <SearchHeader query={query} onChangeQuery={setQuery} />

                {!query.trim() ? (
                    <SearchFilters topRated={topRated} />
                ) : (
                    <View className="pb-6 pt-5">
                        <Text className="px-3 text-[10px] text-white">
                            Resultados Más populares para “{query}”
                        </Text>

                        {loading ? (
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