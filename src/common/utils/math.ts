const isPositiveInteger = (value: number): boolean => {
  if (Number.isInteger(Number(value)) && value >= 0) {
    return true;
  }

  return false;
};

export { isPositiveInteger };
