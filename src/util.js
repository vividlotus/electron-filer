export default class
{
  static sizeLabel(value, unit = true)
  {
    let s = '-'
    let u = 'B'

    switch (true)
    {
      // TB
      case Math.pow(1024, 4) < value:
        s = Math.floor(value / Math.pow(1024, 4) * 100) / 100
        u = 'TB'
        break
      // GB
      case Math.pow(1024, 3) < value:
        s = Math.floor(value / Math.pow(1024, 3) * 100) / 100
        u = 'GB'
        break
      // MB
      case Math.pow(1024, 2) < value:
        s = Math.floor(value / Math.pow(1024, 2) * 100) / 100
        u = 'MB'
        break
      // KB
      case 1024 < value:
        s = Math.floor(value / Math.pow(1024, 1) * 100) / 100
        u = 'KB'
        break
      case typeof value === 'number':
        s = value
        break
    }

    return unit ? `${s} ${u}` : s
  }
}
