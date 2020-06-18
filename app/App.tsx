import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';

import { apolloClient } from './apollo';

const HELLO = gql`
  query {
    hello
  }
`;

function RootComponent() {
  const { data, loading, error } = useQuery(HELLO);
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Data: {data && data.hello}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  details: {
    marginLeft: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    color: 'gray',
  },
  tweetContainer: {
    marginTop: 10,
  },
  tweet: {
    fontSize: 16,
  },
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootComponent />
    </ApolloProvider>
  );
}
