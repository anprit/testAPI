const getLastModelIndex = async (model): Promise<number> => {
  const result = await model.find();
  if (result.length) {
    return +result[result.length - 1].id
  }
  return 0
}

export default getLastModelIndex;
