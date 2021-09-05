<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="drive of drives" :key="drive.latter" cols="12" sm="6" md="4" lg="3">
        <v-card
          @dblclick="onClickDrive(drive)"
          ripple
          link
        >
          <v-card-text>
            <div>
              {{ drive.name }}
            </div>
            <div class="grey--text text--darken-2 caption">
              {{ drive.useSizeWithUnit() }} / {{ drive.totalSizeWithUnit() }}
              ({{ drive.freeSizeWithUnit() }})
            </div>
            <div>
              <v-progress-linear
                :value="drive.useSizePercent()"
                color="teal darken-2"
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RepositoryFactory from '@/data/repositories/repository_factory'

const DriveRepository = RepositoryFactory.get('drive')

export default {
  name: 'DrivePage',
  data ()
  {
    return {
      drives: [],
    }
  },
  created ()
  {
    this.fetch()
  },
  methods: {
    async fetch ()
    {
      DriveRepository.all()
        .then(drives => {
          this.drives = drives
          setTimeout(() => { // ここでsetTimeoutを入れないと遷移する際に一瞬ラグが出る
            drives.forEach((drive, i) => {
              DriveRepository.getDriveSize(drive).then(d => { this.drives[i] = d })
            })
          })
        })
    },
    async onClickDrive (drive)
    {
      this.$router.push({ name: 'EntryPage', params: { path: drive.path } })
    },
  }
}
</script>
