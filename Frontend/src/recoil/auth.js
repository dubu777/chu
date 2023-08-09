import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 토큰 로컬스토리지에 저장 atom
export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom], // Recoil Persist를 적용
});

// 로그인시 받을 데이터 atom
export const loginResultState = atom({
  key: 'loginResultState',
  default: null,
});

// 아이디 찾기 atom
export const setFindId = atom({
  key: 'setFindId',
  default: null,
})


export const setExistState = atom({
  key: 'setExistState',
  default: null,
})

// 로그인 여부 selector
export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => get(accessTokenState) !== null,
});

