<script setup lang="ts">
import { storeToRefs } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import { useTodoStore } from '@/stores/todos';

const todoStore = useTodoStore()
todoStore.fetch()

const { todos } = storeToRefs(todoStore)

</script>
<template>
  <v-container class="fill-height">
    <v-list class="mt-3" min-width="95%" lines="two">
      <v-list-subheader>Todos</v-list-subheader>
      <v-list-item v-for="item in todos" :key="item.id" :title="item.title.text" :subtitle="item.description.text">
        <template v-slot:prepend>
          <v-checkbox-btn v-model="item.done" @click="todoStore.update(item.id)" />
        </template>
        <template v-slot:append>
          <v-avatar color="">
            <v-icon color="grey-lighten" icon="mdi-dots-horizontal" />
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-row>
      <v-col class="ml-5">
        <v-btn @click="todoStore.fetch()">fetch</v-btn>
        <v-btn class="ml-3" @click="todoStore.print()">print</v-btn>
        <v-btn class="ml-3" @click="todoStore.get('aaa')">get</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
