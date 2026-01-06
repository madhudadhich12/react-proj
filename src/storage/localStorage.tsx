// Retrieve a typed value from localStorage by key.
// Returns `null` when nothing is stored under the key.
export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
}

// Persist a typed value under `key`. The value is JSON-stringified.
export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Remove the entry for `key` from localStorage.
export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
