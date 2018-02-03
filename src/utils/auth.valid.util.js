import isEmpty from 'lodash/isEmpty';
import intersection from 'lodash/intersection';

export const requireRole = role => (route) => {
  const newRoute = {
    ...route,
    async action(param) {
      const { store } = param;
      const state = store.getState();
      if (!state.user || !state.user.roles || state.user.roles.length < 0
          || state.user.roles.indexOf(role) < 0) {
        return {
          redirect: '/login',
        };
      }
      const result = await route.action(param);
      return result;
    },
  };
  return newRoute;
};

export const requireAuth = (route) => {
  const newRoute = {
    ...route,
    async action(param) {
      const { store } = param;
      const state = store.getState();
      if (!state.user || !state.user.id) {
        return {
          redirect: '/login',
        };
      }
      const result = await route.action(param);
      return result;
    },
  };
  const children = route && route.children;
  if (!isEmpty(children)) {
    newRoute.children = children.map(childRoute => requireAuth(childRoute));
  }
  return newRoute;
};

export const checkAuth = (store, pageRoles = []) => {
  const state = store.getState();
  if (!state.user || !state.user.id || !state.user.roles) {
    return {
      redirect: '/login',
    };
  }
  const { user } = state;
  if (!isEmpty(pageRoles) && intersection(user.roles, pageRoles).length < 1) {
    return {
      redirect: '/notFound',
    };
  }
  return false;
};
