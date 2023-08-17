import { atom } from 'recoil';

// 예약 정보를 각각 Atom에 정의(예약일, 시간, 메모)
export const reserveInfo = atom({
    key: 'reserveInfo',
    default: {
      customerSeq: null,
      designerSeq: null,
      date: null,
      time: null,
      consultingMemo: '',
      portfolios: null,
    },
  });


export const imgFileState = atom({
  key: 'imgFile',
  default: null,
});