interface TaskItem {
  /** 任務 id */
  id:string
  /** 任務名稱 */
  title:string
  /** 任務內容 */
  content:string
}

type Tasks = TaskItem[]

interface TaskCard {
  /** 卡片 id */
  id: string
  /** 卡片名稱 */
  title: string
  /** 任務列表 */
  tasks: Tasks
}

type TasksList = TaskCard[]

interface CurrentEditTask extends TaskItem {
  cardId: string
}

export {
  TaskCard,
  TaskItem,
  Tasks,
  TasksList,
  CurrentEditTask
}
