import DatasourceFactory from '@/data/datasources/datasource_factory'
import DriveRepository from './drive_repository'
import EntryRepository from './entry_repository'

const repositories = {
  'drive': new DriveRepository(DatasourceFactory),
  'entry': new EntryRepository(DatasourceFactory),
}

export default
{
  get: (name) => repositories[name],
}
