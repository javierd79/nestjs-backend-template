interface Array<T> {
  last(): T
  first(): T
  removeAt(index: number): T | 0
  mapAndFilter<T>(callback: (value: T, index: number, array: T[]) => T | undefined): T[]
  has_many(key: string, value: any): [keyof T, any] | []
  range(start: number, end: number): number[]
  compact(): T[]
  sample(): T
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

Array.prototype.first = function() {
  return this[0]
}

Array.prototype.removeAt = function(index: number) {
  return this.splice(index, 1)[0]
}

Array.prototype.mapAndFilter = function(callback) {
  return this.map(callback).filter(Boolean)
}

Array.prototype.has_many = function(key, value) {
  return this.filter((item) => item[key] === value)
}

Array.prototype.range = function(start, end) {
  return Array(end - start + 1).fill(undefined).map((_, i) => start + i)
}

Array.prototype.compact = function() {
  return this.filter(Boolean)
}

Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)]
}
