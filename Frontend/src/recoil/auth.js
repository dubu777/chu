import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom], // Recoil Persist를 적용
});

// 로그인시 받을 데이터
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


export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => get(accessTokenState) !== null,
});


export const toggleLoginState = selector({
  key: 'toggleLoginState',
  get: ({ get }) => {
    const isLoggedIn = get(isLoggedInState);
    return isLoggedIn;
  },
  set: ({ set }) => {
    set(isLoggedInState, (prev) => !prev);
  },
});

export const useToggleLoginState = () => {
  const setToggleLoginState = useSetRecoilState(toggleLoginState);
  return setToggleLoginState;
};

export const useIsLoggedIn = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn;
};