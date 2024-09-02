export const Timer = {
  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
}
