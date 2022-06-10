import {
    atom,
    selector,
  } from 'recoil';
export const textState = atom({
    key:'textState',
    default:''
})
export const chartCountState = selector({
  key:'chartCountState',
  get:({get})=>{
    return get(textState).length
  }
})