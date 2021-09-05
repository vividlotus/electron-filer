<template>
  <v-card
    @dblclick="$emit('onClickEntry', entry)"
    ripple
    link
  >
    <v-card-text>
      <div>
        {{ entry.name }}
      </div>
      <div class="grey--text text--darken-2 caption">
        {{ entry.useSizeWithUnit() }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Entry from '@/domain/entry'
export default {
  name: 'Entry',
  props: {
    entry: {
      type: Entry,
      required: true,
    },
  },
}
</script>
