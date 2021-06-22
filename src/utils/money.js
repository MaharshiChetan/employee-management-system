export const formatMoney = (value) => {
  const currencyValue = parseFloat(value || 0);
  return currencyValue
    .toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'INR',
    })
    .replace(/\.00$/, '');
};
