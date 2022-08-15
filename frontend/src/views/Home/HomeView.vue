<template>
  <MenuBT></MenuBT>
  <div class="home-container">
    <div class="container-elements">
      <div class="project-container">
        <div v-for="project in projects" :key="project.id">
          <CardBT :title="project.name" :id="project.id" :removerProject="removerProject"></CardBT>
        </div>
      </div>
      <div class="new-project-container">
        <div class="form-new-project">
          <div class="form">
              <div class="container-field-form">
                  <span class="label">Create a new project</span>
                  <input
                    type="text"
                    class="field-form"
                    placeholder="Project name"
                    v-model="form.name_new_project"
                  />
              </div>
              <div class="button-container">
                  <button class="button" :type="type" v-on:click="createProject">Create Project</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBT from '@/components/Menu/MenuBT'
import RequestService from "@/util/request.service";
import CardBT from '@/components/Card/CardBT.vue';

export default {
  name: 'HomeView',
  components: {
    MenuBT,
    CardBT
  },

  data() {
    return {
      projects: [],
      form: {
        name_new_project: ''
      }
    }
  },
  async created () {
    await RequestService.IsAuthenticate();
    await this.listProject()
  },
  methods: {
    listProject() {
      RequestService.listProject()
      .then((result) => {
        this.projects = result;
      })
    },
    async removerProject(id) {
      this.projects = this.projects.filter((item) => item.id !== id);
    },
    async createProject() {
      if (this.form.name_new_project !== '') {
        RequestService.SaveProject({ 
          name: this.form.name_new_project
        })
        .then((result) => {
          if (result) {
            this.form.name_new_project = ''
            this.projects.push(result)
            this.$toast.success("New project registered!");
          } else {
            this.$toast.error("An unexpected error occurred while registering a project, please try again later!");
          }
        })
        .catch(() => {
          this.$toast.error("An unexpected error occurred while registering a project, please try again later!");
        });
      } else {
        this.$toast.error("The project name needs to be filled in!")
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './Home.scss';
</style>