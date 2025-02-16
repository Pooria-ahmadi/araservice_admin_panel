export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            return navigateTo('/login');
        }
    }
});
