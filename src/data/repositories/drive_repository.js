import Env from '@/env'
import DriveMapper from '@/data/mappers/drive_mapper'


export default class DriveRepository
{
  constructor (datasourceFactory)
  {
    this._datasourceFactory = datasourceFactory
    this._mapper = DriveMapper
  }

  async all()
  {
    if (!Env.isWin()) throw new Error('windows only.')

    return this._datasourceFactory.local.driveList()
      .then(drives => this._mapper.transforms(drives))
  }

  async getDriveSize (drive)
  {
    return this._datasourceFactory.local.driveSize(drive.letter)
      .then(sizes => drive.setDriveSizes(sizes.use, sizes.free, sizes.total))
  }
}
