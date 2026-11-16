export interface SelectNavigationOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export function nextSelectableIndex(
  options: readonly SelectNavigationOption[],
  currentIndex: number,
  direction: 1 | -1,
): number {
  if (options.length === 0) return -1;
  for (let step = 1; step <= options.length; step += 1) {
    const index = (currentIndex + direction * step + options.length * 2) % options.length;
    if (!options[index]?.disabled) return index;
  }
  return -1;
}

export function findSelectableMatch(
  options: readonly SelectNavigationOption[],
  query: string,
  currentIndex: number,
): number {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return -1;
  for (let step = 1; step <= options.length; step += 1) {
    const index = (currentIndex + step + options.length) % options.length;
    const option = options[index];
    if (option && !option.disabled && option.label.toLocaleLowerCase().startsWith(normalizedQuery)) {
      return index;
    }
  }
  return -1;
}
