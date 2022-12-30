<script setup lang="ts">
import AddNewTask from './AddNewTask.vue'
import TaskItem from './TaskItem.vue'
</script>

<template>
  <div
    class="bg-slate-200 block border rounded-sm p-2 mx-2 border-gray-500 min-w-[300px]"
  >
    <!-- column -->
    <div class="block overflow-hidden text-ellipsis w-4/5 text-lg">標題</div>
    <!-- <textarea class="resize-none overflow-hidden border-none w-full p-1 h-8 block"></textarea> -->

    <!-- tasks -->
    <TaskItem />
    <!-- tasks -->

    <!-- add new task -->
    <AddNewTask />
    <!-- add new task -->
  </div>
</template>
