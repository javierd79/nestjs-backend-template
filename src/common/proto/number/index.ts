interface Number {
  rand(min: number, max: number): number
}

Number.prototype.rand = function(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

Date.prototype.setDays = function(days: number) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}