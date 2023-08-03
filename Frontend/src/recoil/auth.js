import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom], // Recoil Persist를 적용
});

export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => get(accessTokenState) !== null,
});

export const loginResultState = atom({
  key: 'loginResultState',
  default: null,
});

export const setFindId = atom({
  key: 'setFindId',
  default: null,
})

export const setExistState = atom({
  key: 'setExistState',
  default: null,
})
