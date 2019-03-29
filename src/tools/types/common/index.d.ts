type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialOmit<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
