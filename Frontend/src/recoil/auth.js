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
 
export const setFindId = atom({
  key: 'setFindId',
  default: null,
})

// 여기서도 이름 바꾸기 싫어서 여기에 seq 저장해
export const setFindPwd = atom({
  key: 'setFindPwd',
  default: null,
})

export const setExistState = atom({
  key: 'setExistState',
  default: null,
})

// 이거 이름 다 바꾸기 넘 귀찮아서 여기서 usertype 저장해
export const setExistPwState = atom({
  key: 'setExistPwState',
  default: null,
})

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const setAuthNumber = atom({
  key: 'setAuthNumber',
  default: null,
})


// 로그인 여부 selector
export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => get(accessTokenState) !== null,
});

