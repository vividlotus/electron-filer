const TypeEnum = {
  DRIVE: Symbol('DRIVE'),
  DIRECTORY: Symbol('DIRECTORY'),
  FILE: Symbol('FILE'),
  SYMBOLIC_LINK: Symbol('SYMBOLIC_LINK'),
  SOCKET: Symbol('SOCKET'),
  FIFO: Symbol('FIFO'),
  UNKNOWN: Symbol('UNKNOWN'),
}

export default class Type
{
  static get DRIVE() { return TypeEnum.DRIVE }
  static get DIRECTORY() { return TypeEnum.DIRECTORY }
  static get FILE() { return TypeEnum.FILE }
  static get SYMBOLIC_LINK() { return TypeEnum.SYMBOLIC_LINK }
  static get SOCKET() { return TypeEnum.SOCKET }
  static get FIFO() { return TypeEnum.FIFO }
  static get UNKNOWN() { return TypeEnum.UNKNOWN }
  static getFromStats(stats)
  {
    switch (true)
    {
      case stats.isSymbolicLink():
        return this.SYMBOLIC_LINK
      case stats.isDirectory():
        return this.DIRECTORY
      case stats.isFile():
        return this.FILE
      case stats.isSocket():
        return this.SOCKET
      case stats.isFIFO():
        return this.FIFO
      default:
        return this.UNKNOWN
    }
  }
}
