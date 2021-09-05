import EntryMapper from '@/data/mappers/entry_mapper'


export default class EntryRepository
{
  constructor (datasourceFactory)
  {
    this._datasourceFactory = datasourceFactory
    this._mapper = EntryMapper
  }

  async all(dir)
  {
    return this._datasourceFactory.local.ls(dir)
      .then(entries => this._mapper.transforms(entries))
  }

  async getFolderSize (entry)
  {
    return this._datasourceFactory.local.folderSize(entry.path)
      .then(size => entry.setSize(size))
  }
}
