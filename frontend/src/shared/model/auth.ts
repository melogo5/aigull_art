import { createEffect, createEvent, createStore, sample } from 'effector';
import { authApi } from '../api/auth/authApi';
import { User } from '@/entities/user/types';

export const login = createEvent<{ email: string; password: string }>();
export const logout = createEvent();
export const fetchUser = createEvent();

export const loginFx = createEffect(authApi.login);
export const logoutFx = createEffect(authApi.logout);
export const fetchUserFx = createEffect(authApi.getMe);

export const $user = createStore<User | null>(null)
  .on(fetchUserFx.doneData, (_, user) => user)
  .reset(logout);

export const $isLoggingIn = loginFx.pending;
export const $isLoggingOut = logoutFx.pending;
export const $isFecthingUser = fetchUserFx.pending;

sample({
  clock: login,
  target: loginFx,
});

sample({
  clock: loginFx.done,
  target: fetchUser,
});

sample({
  clock: fetchUser,
  target: fetchUserFx,
});

sample({
  clock: logout,
  target: logoutFx,
});
