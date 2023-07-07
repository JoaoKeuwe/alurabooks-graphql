import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:9000/graphql',
});

const ABApolloClient = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ABApolloClient;
