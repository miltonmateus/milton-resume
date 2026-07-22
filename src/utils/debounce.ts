export function debounce(callback: () => void, delayInMs: number): () => void {
  let timeoutId: number | undefined;

  return () => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(callback, delayInMs);
  };
}
