interface Tasks {
  id: string;
  createdAt: Date;
  done: boolean;
}

function Get(url: string) {
  return function (target: any, name: string) {
    const fetch = () => Promise.resolve([
      { id: 0, createdAt: new Date(), done: false }
    ])

    Object.defineProperty(target, name, {
      get() {
        return fetch()
      }
    })
  }
}

class TaskService {
  @Get('/tasks')
  tasks!: Promise<Tasks[]>;
}

const tasksService = new TaskService();

(async () => {
  const tasks = await tasksService.tasks
  console.log(tasks)
})()