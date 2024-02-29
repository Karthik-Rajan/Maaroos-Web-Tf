import { methodProps } from '../constants/apis';
import moment from 'moment';

export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
    r: 0, g: 0, b: 0
  };

}

export const setColor = (hex: string) => {
  // const rgbValue: any[] = [255, 0, 0];
  // rgbValue[0] = Math.round(Math.random() * 255);
  // rgbValue[1] = Math.round(Math.random() * 255);
  // rgbValue[2] = Math.round(Math.random() * 255);
  const { r, g, b }: any = hexToRgb(hex);
  var color = Math.round(((parseInt(r) * 299) +
    (parseInt(g) * 587) +
    (parseInt(b) * 114)) / 1000);
  var textColor = (color > 125) ? 'black' : 'white';
  var backColor =
    'rgb(' + r + ', ' + g + ', '
    + b + ')';
  return [textColor, backColor]
}
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

export const getDatesBetween = ({ fromDate, toDate }: any) => {
  const startDate = moment(fromDate).toDate();
  const endDate = moment(toDate).toDate();
  const currentDate = new Date(startDate.getTime());
  const dates = [];
  while (currentDate <= endDate) {
    dates.push(moment(currentDate).format('YYYY-MM-DD 00:00:00'));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}