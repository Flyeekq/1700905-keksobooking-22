const debounce = (func, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export { debounce };
