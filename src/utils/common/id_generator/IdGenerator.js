const IdGenerator = () => {
  const generate = () => {
    return Date.now();
  };

  return {
    generate,
  };
};

export default IdGenerator();
