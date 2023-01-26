import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

import {useGetShipsQuery} from '../../services/spacex';

type Ship = {
  name: string;
};

function SpaceXShips(): JSX.Element {
  const {data = [], error, isLoading} = useGetShipsQuery({});

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default SpaceXShips;
