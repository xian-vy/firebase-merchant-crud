export const isValidInput = (value: any) => {
  const regex = /^(?!.*\..*\.)[0-9]*(\.[0-9]{0,2})?$/;
  return regex.test(value);
};

export function formatNumberWithoutCurrency(amount: number) {
  const roundedAmount = Math.round(amount * 100) / 100;
  let formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedAmount);

  return formattedAmount;
}
