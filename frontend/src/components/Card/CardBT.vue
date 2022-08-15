<template>
  <div class="card-container">
    <div class="card-header">
      <div class="card-title-edit" v-if="edit">
        <input
          type="text"
          class="project-edit-input"
          placeholder="Project Name"
          v-on:keyup.enter="editProject"
          v-model="project_name"
        />
        <button class="btn-edit-project save" v-on:click="editProject">Save</button>
        <button class="btn-edit-project" v-on:click="setEdit">Cancel</button>
      </div>
      <span v-if="!edit" class="card-title">{{project_name}}</span>
      <div v-if="!edit" class="card-icons">
        <img class="icon-actions" src="../../assets/pen-solid.svg" v-on:click="setEdit"/>
        <img class="icon-actions" src="../../assets/trash-can-solid.svg" v-on:click="deleteProject">
      </div>
    </div>
    <div class="card-main">
      <div v-if="taskTodo.length === 0 && taskDone.length === 0">
        No task registered
      </div>
      <div v-else class="tasks-container">
        <span class="card-title">To Do</span>
        <div class="register-task">
          <div class="task" v-for="task in taskTodo" :key="task.id">
            <div class="item-list">
              <input type="checkbox" :id="task.description" :name="task.description" v-on:click="() => checkTask(task.id)">
              <label :for="task.description">{{task.description}}</label>
            </div>
            <div class="card-icons">
              <img class="icon-actions" src="../../assets/trash-can-solid.svg" v-on:click="() => excluirTask(task.id)">
            </div>
          </div>
        </div>
        <span class="card-title">Done</span>
         <div class="register-task">
          <div class="task" v-for="task in taskDone" :key="task.id">
            <div class="item-list"  :title="`Finished on ${task.dateDone}`">
              <input type="checkbox" :id="task.description" :name="task.description" checked disabled>
              <label :for="task.description">{{task.description}}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-field-task">
        <input
          type="text"
          class="task-form"
          placeholder="Task"
          v-bind:class="{ invalid: v$.form.new_task_name.$errors.length > 0 }" 
          v-on:keyup.enter="addTask"
          v-model="form.new_task_name"
        />
        <button class="add-task" v-on:click="addTask">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import RequestService from "@/util/request.service";
import { required, helpers } from '@vuelidate/validators'
import formatDate from '@/util/formatDate';

export default {
  name: 'CardBT',
  props: {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    removerProject: {
      type: Function,
      required: true
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      project_name: '',
      edit: false,
      taskTodo: [],
      taskDone: [],
      form: {
        new_task_name: ''
      }
    }
  },
  validations () {
    return {
      form: {
        new_task_name: {
          required: helpers.withMessage('A descrição da Task precisa ser preenchida!', required),
        },
      }
    }
  },
  async created() {
    this.project_name = this.title
    await this.getTask()
  },
  methods: {
    setEdit() {
      this.edit = !this.edit
    },
    getTask() {
      RequestService.getTasks(this.id)
      .then((result) => {
        const tasks = result.map((item) => {
          if (item.done) {
            item.dateDone = formatDate(item.dateDone)
          }
          return item
        })
        this.taskDone = tasks.filter((item) => item.done)
        this.taskTodo = tasks.filter((item) => !item.done)
      })
    },
    async addTask() {
      const hasValidate = await this.v$.$validate()
      if (hasValidate) {
        RequestService.SaveTask({ 
          description: this.form.new_task_name,
          projectId: this.id
        })
        .then((result) => {
          if (result) {
            this.form.new_task_name = ''
            this.v$.$reset()
            this.getTask();
            this.$toast.success("New task registered!");
          } else {
            this.$toast.error("An unexpected error occurred while registering a task, please try again later!");
          }
        })
        .catch(() => {
          this.$toast.error("An unexpected error occurred while registering a task, please try again later!");
        });
      } else {
        await this.v$.$errors.forEach((error) => {
          this.$toast.error(error.$message)
        })
      }
    },
    async checkTask(taskId) {
      RequestService.CheckTask(taskId)
      .then(() => {
        this.getTask();
        this.$toast.success("Finished task!");
      })
      .catch(() => {
        this.$toast.error("An unexpected error occurred while finishing this task, please try again later!");
      });
    },
    async excluirTask(taskId) {
      RequestService.ExcluirTask(taskId)
      .then(() => {
        this.getTask();
        this.$toast.success("Task deleted!");
      })
      .catch(() => {
        this.$toast.error("An unexpected error occurred while deleting a task, please try again later!");
      });
    },
    async deleteProject() {
      RequestService.ExcluirProject(this.id)
      .then(() => {
        this.removerProject(this.id);
        this.$toast.success("Project deleted!");
      })
      .catch(() => {
        this.$toast.error("An unexpected error occurred while deleting a project, please try again later!");
      });
    },
    async editProject() {
      RequestService.EditProject(this.id, this.project_name)
      .then(() => {
        this.setEdit()
        this.$toast.success("Edited project name!");
      })
      .catch(() => {
        this.$toast.error("An unexpected error occurred while editing this project, please try again later!");
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import './CardBT.scss';
</style>