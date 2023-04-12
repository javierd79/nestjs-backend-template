interface Date {
  format(): string
  setDays(days: number): Date
  toMs(): any
  nowTwelve(): Date
  add(quantity: number, prefix: string): Date
}

Date.prototype.format = function () {
  return formatDate(this)
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}

Date.prototype.setDays = function(days: number) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

function transformToMillisecond(date: string) {
  return new Date(date).getTime()
}

Date.prototype.toMs = function() {
  return transformToMillisecond(this)
}

Date.prototype.nowTwelve = function() {
  return new Date(`${new Date().toString().slice(0, 15)} 00:00:00`)
}

Date.prototype.add = function(quantity: number = 1, prefix: string = 'days') {
  switch (prefix) {
    case 'days':
      return this.setDays(quantity)
    case 'months':
      return new Date(this.setMonth(this.getMonth() + quantity))
    case 'years':
      return new Date(this.setFullYear(this.getFullYear() + quantity))
    default:
      return this
  }
}
