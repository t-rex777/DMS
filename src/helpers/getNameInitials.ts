export const getNameInitials = (name: string) => {
  const valueArr = name.match(/(^\w)|([ ]\w)/g)

  return valueArr === null ? '' : valueArr.slice(0, 2).join('').replace(' ', '')
}
