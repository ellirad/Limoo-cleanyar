export const iran_mobile = (value) => {
  if (!value) return true;
  const rule = /^(\+\u06F9\u06F8|\u06F0|98|0)?(\u06F9|9)([\u06F0-\u06F90-9]{9}|\d{9})$/;
  return rule.test(value);
};

export const farsi_text = (value) => {
  if (!value) return true;
  const rule = /^([\u0600-\u06F0]|[\u06F9-\u06FF]|[' '])+$/;
  return rule.test(value);
};

export const fa_en_num = (value) => {
  if (!value) return true;
  const rule = /^([0-9]|[\u06F0-\u06F9])+$/;
  return rule.test(value);
};
