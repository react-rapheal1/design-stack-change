function toggleSelectedValue<T>(items: T[], value: T) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

export { toggleSelectedValue };
