<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      clipped-right
      dense
      height="30"
      elevation="0"
    >
      <v-btn
        tile
        depressed
        x-small
        height="30"
        @click="drawer = !drawer"
      >
        <v-icon class="grey--text text--lighten-1" dense small>
          mdi-menu
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <span class="grey--text text--darken-1">
        {{ $store.state.headerText }}
      </span>

      <v-spacer></v-spacer>

      <v-btn
        tile
        depressed
        x-small
        height="30"
        @click="onClickWindowMinimize()"
      >
        <v-icon class="grey--text text--lighten-1" dense small>
          mdi-window-minimize
        </v-icon>
      </v-btn>
      <v-btn
        tile
        depressed
        x-small
        height="30"
        @click="onClickWindowMaximize()"
      >
        <v-icon class="grey--text text--lighten-1" dense small>
          mdi-window-maximize
        </v-icon>
      </v-btn>
      <v-btn
        tile
        depressed
        x-small
        height="30"
        @click="onClickWindowClose()"
      >
        <v-icon class="grey--text text--lighten-1" dense small>
          mdi-window-close
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      mobile-breakpoint="0"
      class="grey darken-4"
    >
      <v-list
        dense
      >
        <template v-for="(item, i) in items">
          <v-list-item
            :key="i"
            :to="{ name: item.name }"
          >
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-navigation-drawer
      app
      clipped
      right
      v-model="drawerRight"
      mobile-breakpoint="0"
      class="grey darken-4"
    >
      <v-list
        dense
      >
        <template v-for="(item, i) in items">
          <v-list-item
            :key="i"
            link
          >
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      app
      height="24"
      class="text-caption py-0 grey--text"
    >
      <div>{{ $store.state.footerText }}</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    drawerRight: false,
    items: [
      { name: 'DrivePage', text: 'Home' },
    ],
  }),
  methods: {
    onClickWindowMinimize () { window.ElectronApi.ipcRenderer.send('minimize', true) },
    onClickWindowMaximize () { window.ElectronApi.ipcRenderer.send('maximize', true) },
    onClickWindowClose () { window.close() }
  },
}
</script>

<style lang="scss">
// ヘッダー
#app header > .v-toolbar__content {
  padding: 0px;
  -webkit-app-region: drag;
  user-select: none;
  button {
    -webkit-app-region: no-drag;
    cursor: auto;
  }
}
// 独自スクロールバー
body::-webkit-scrollbar {
  display: none;
}
.v-main__wrap {
  overflow-y: scroll;
  height: calc(100vh - 54px);
}
::-webkit-scrollbar {
    width: 7px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 150, 120, 0.8);
  border-radius: 10px;
  box-shadow:0 0 0 1px rgba(0, 150, 120, 0.3);
}
</style>