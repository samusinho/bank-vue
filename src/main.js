import { createApp } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import {createApolloProvider} from '@vue/apollo-option';
import router from '@/router';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        return {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        };
    } else {
        return headers;
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
});

const app = createApp(App);

app.use(apolloProvider);
app.use(router);

app.mount('#app')
