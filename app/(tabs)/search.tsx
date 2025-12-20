import { FlatList, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '@/lib/useAppwrite';
import { getCategories, getMenu } from '@/lib/appwrite';
import { useLocalSearchParams } from 'expo-router';
import CartButton from '@/components/CartButton';

const Search = () => {
  const { category, query } = useLocalSearchParams<{ query: string; category: string }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between w-full flex-row">
              <View className="flex-start">
                <Text>Search</Text>
                <View className="flex-start mt-0.5 flex-row gap-x-1">
                  <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                </View>
              </View>

              <CartButton />
            </View>

            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results!</Text>}
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View className="max-w-[48%] flex-1">
              <Text>Menu Card</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
