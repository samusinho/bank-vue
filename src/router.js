import { createRouter, createWebHistory } from 'vue-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

const routes = [
    {
        path: '/',
        name: 'signIn',
        component: SignIn,
        meta: { requireAuth: false }
    },
    {
        path: '/signup',
        name: 'signUp',
        component: SignUp,
        meta: { requireAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requireAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

async function isAuth() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return !access_token || !refresh_token;
}

router.beforeEach(async (to) => {
    if (to.meta.requireAuth) {
        if (await isAuth()) {
            return true
        } else {
            return { name: 'signIn' };
        }
    } else {
        return true;
    }
});

export default router;