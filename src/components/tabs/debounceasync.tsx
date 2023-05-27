export function debounceAsync(func: any, waitMs: number) {
    let timeout: number = null!;
  
    return (...args: any) => {
      clearTimeout(timeout);
      return new Promise((resolve) => {
        timeout = setTimeout(() => resolve(func(...args)), waitMs);
      });
    };
  }