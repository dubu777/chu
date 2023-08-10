import { atom, useRecoilState } from 'recoil';

// 예약 정보를 각각 Atom에 정의(예약일, 시간, 메모)
export const reserveInfo = atom({
    key: 'customerSeq',
    default: {
      customerSeq: null,
      designerSeq: null,
      date: null,
      time: null,
      consultingMemo: '',
      portfolios: []
    },
  });

const consultImg = atom({
  key: 'selectedFile',
  default: null,
});
