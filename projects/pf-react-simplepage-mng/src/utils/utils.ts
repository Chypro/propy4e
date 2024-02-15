import { Category } from '../types/app/categories';

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export function findAncestors(categories: Category[], targetValue: string): string[] {
  const result: string[] = [];

  function findAncestorsRecursively(
    category: any[],
    targetValue: string | number,
    ancestors: string[]
  ): boolean {
    for (const cat of category) {
      if (cat.value === targetValue) {
        result.push(...ancestors, cat.value);
        return true;
      }
      if (cat.children) {
        ancestors.push(cat.value);
        if (findAncestorsRecursively(cat.children, targetValue, ancestors)) {
          return true;
        }
        ancestors.pop();
      }
    }
    return false;
  }

  findAncestorsRecursively(categories, targetValue, []);
  console.log(result);
  return result;
}
export const convertStringOptionToArray = (string: string) => {
  return string.split(';').slice(1);
};
