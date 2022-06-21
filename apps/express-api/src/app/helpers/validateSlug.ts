const validateSlug = (slug: string): boolean => {
  const regExp = new RegExp(/^[a-zA-Z]{3}-[a-zA-Z\d-]+/);
  return regExp.test(slug)
}

export default validateSlug;
