import BaseMapper from './base_mapper'
import Drive from '@/domain/drive'

export default class extends BaseMapper
{
  static transform (value)
  {
    return new Drive(
      value.path,
      value.letter,
      value.size,
      value.free,
      value.total,
      new Date(),
      new Date()
    )
  }
}
