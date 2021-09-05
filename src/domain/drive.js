import Util from '@/util'

export default class Drive
{
  constructor (path, letter, useSize = null, freeSize = null, totalSize = null, createdAt = new Date(), updatedAt = new Date())
  {
    this._path = path
    this._letter = letter
    this._useSize = useSize // 使用容量
    this._freeSize = freeSize // 空き容量
    this._totalSize = totalSize // 合計容量
    this._createdAt = new Date(createdAt)
    this._updatedAt = new Date(updatedAt)
  }

  // ==================================================
  // setter / getter
  // ==================================================

  get path () { return this._path }
  get letter () { return this._letter }
  get useSize () { return this._useSize }
  get freeSize () { return this._freeSize }
  get totalSize () { return this._totalSize }
  get createdAt () { return this._createdAt }
  get updatedAt () { return this._updatedAt }

  get name () { return `${this._letter}:` }

  // ==================================================
  // methods
  // ==================================================

  setDriveSizes (use, free, total)
  {
    this._useSize = use
    this._freeSize = free
    this._totalSize = total

    return this._update(this)
  }

  useSizeWithUnit ()
  {
    return Util.sizeLabel(this._useSize)
  }

  freeSizeWithUnit ()
  {
    return Util.sizeLabel(this._freeSize)
  }

  totalSizeWithUnit ()
  {
    return Util.sizeLabel(this._totalSize)
  }

  useSizePercent ()
  {
    if (this._useSize === null || this._totalSize === null) return null

    return (this._useSize / this._totalSize) * 100
  }

  _update (updated)
  {
    return new Drive(
      updated.path,
      updated.letter,
      updated.useSize,
      updated.freeSize,
      updated.totalSize,
      updated.createdAt,
      updated.updatedAt,
    )
  }
}
