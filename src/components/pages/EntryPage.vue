<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="entry of entries" :key="entry.id" cols="12" sm="6" md="4" lg="3">
        <Entry
          @onClickEntry="onClickEntry"
          :entry="entry"
        ></Entry>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RepositoryFactory from '@/data/repositories/repository_factory'
import Entry from '@/components/molecules/Entry.vue'

const EntryRepository = RepositoryFactory.get('entry')

export default {
  name: 'EntryPage',
  components: {
    Entry,
  },
  data ()
  {
    return {
      entries: [],
    }
  },
  created ()
  {
    this.fetch(this.$route.params.path)
  },
  beforeRouteUpdate (to, from, next)
  {
    this.entries = []
    this.fetch(to.params.path)
    next()
  },
  methods: {
    async fetch (path)
    {
      EntryRepository.all(path)
        .then(entries => {
          this.entries = entries
          setTimeout(() => { // ここでsetTimeoutを入れないと遷移する際に一瞬ラグが出る
            entries.filter(entry => entry.isDir()).forEach((entry, i) => {
              EntryRepository.getFolderSize(entry).then(e => { this.entries[i] = e })
            })
          })
        })
    },
    async onClickEntry (entry)
    {
      this.$router.push({ name: 'EntryPage', params: { path: entry.path } })
    },
  }
}
</script>
