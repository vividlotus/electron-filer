import BaseMapper from './base_mapper'
import Entry from '@/domain/entry'

export default class extends BaseMapper
{
  static transform (value)
  {
    return new Entry(
      value.path,
      value.type,
      value.size,
      new Date(),
      new Date()
    )
  }
}
