import * as pathModule from 'path'
import Util from '@/util'
import Type from '@/type'

export default class Entry
{
  constructor (path, type, useSize = null, createdAt = new Date(), updatedAt = new Date())
  {
    this._path = path
    this._type = type
    this._useSize = useSize
    this._createdAt = new Date(createdAt)
    this._updatedAt = new Date(updatedAt)
  }

  // ==================================================
  // setter / getter
  // ==================================================

  get path () { return this._path }
  get type () { return this._type }
  get useSize () { return this._useSize }
  get createdAt () { return this._createdAt }
  get updatedAt () { return this._updatedAt }

  get name () { return pathModule.basename(this._path) }
  get basename () { return pathModule.basename(this._path, this.ext) }
  get ext () { return pathModule.extname(this._path) }

  // ==================================================
  // methods
  // ==================================================

  setSize (size)
  {
    this._useSize = size

    return this._update(this)
  }

  useSizeWithUnit ()
  {
    return Util.sizeLabel(this._useSize)
  }

  isFile ()
  {
    return this._type === Type.FILE
  }

  isDir ()
  {
    return this._type === Type.DIRECTORY
  }

  _update (updated)
  {
    return new Entry(
      updated.path,
      updated.type,
      updated.useSize,
      updated.createdAt,
      updated.updatedAt
    )
  }
}
