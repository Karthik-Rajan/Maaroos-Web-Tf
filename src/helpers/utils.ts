import useRazorpay from 'react-razorpay';
import { methodProps } from '../constants/apis';
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const createOrder = async (amount: number) => {
  let order = {};
  await fetch("https://api.razorpay.com/v1/orders", {
    ...methodProps('POST', { amount, currency: "INR", receipt: "ma_010001" }),
    headers: {
      'Authorization': 'Basic ' + btoa('rzp_test_JLOs2SaWEERrUz' + ":" + '4z8H9aF4GTFnUgQvsXuViifK'),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then(res => {
      order = res;
    });
  return order;
}