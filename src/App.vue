<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
       My name's Phương Nam
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <div class="process-bar" v-for="(x, index) in bars" v-bind:key="index">
          <v-progress-linear
            class="process-item"
            :color="bars[index].isOverload ? 'red' : 'grey'"
            v-model="bars[index].percent"
            height="25"
            reactive
          >
            <template v-slot="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>

          <br>
        </div>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              class="process-select"
              v-model="selectedProcessBarId"
              :items="bars"
              item-text="id_process"
              label="Select Process Bar"
              outlined
            ></v-select>
          </v-col>
          <v-col style="margin-top:10px" cols="12" md="9">
            <v-btn v-on:click="onClickButton(item)"
              v-for="item in buttons" v-bind:key="item"  class="ma-2 button-number" outlined color="indigo">{{item}}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      buttons: [],
      bars: [],
      limit: null,
      selectedProcessBarId: 1
    }
  },
  methods: {
    onClickButton (value) {
      const founBar = this.bars.findIndex(obj => obj.id_process === this.selectedProcessBarId)
      if (this.bars[founBar].percent >= 0) {
        const newValue = this.bars[founBar].percent + value
        if (newValue >= 0) {
          this.bars[founBar].percent = newValue
          if (this.bars[founBar].percent > this.limit) {
            this.bars[founBar].isOverload = true
          } else {
            this.bars[founBar].isOverload = false
          }
        } else {
          this.bars[founBar].percent = 0
        }
      }
    }
  },
  created () {
    const vm = this
    axios.get('http://pb-api.herokuapp.com/bars')
      .then(response => {
        vm.limit = response.data.limit
        vm.buttons = response.data.buttons
        vm.bars = response.data.bars.map((item, index) => {
          const temp = {}
          temp.id_process = index + 1
          temp.percent = item
          temp.isOverload = item > vm.limit
          return temp
        })
      })
      .catch(e => {
        vm.errors.push(e)
      })
  }
}
</script>
