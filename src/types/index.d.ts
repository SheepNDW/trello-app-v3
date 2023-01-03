interface TaskItem {
  id:string
  title:string
  content:string
}

type Tasks = TaskItem[]

interface TaskCard {
  id: string
  title: string
  tasks: Tasks
}

type TasksList = TaskCard[]

export {
  TaskCard,
  TaskItem,
  Tasks,
  TasksList
}
