<template>
  <div>
      <div class="test" v-for="item in filteredItems" :id="item[1]">
          {{ item }}
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            urlAPIcategory: '/api/search',
            test: []
        }
    },
    methods: {
        getJSON (url) {
            return fetch(url)
            .then(d => d.json())
        }
    },
    mounted() {
        this.getJSON (this.urlAPIcategory)
            .then(d => {
                this.test = d;
            })
            
    },
    computed: {
        filteredItems: function() {
            let result = this.test;
            let title = [];
            let jobs = [];
            for (let i = 0; i < result.length; i++) {
                title.push(result[i].jobs)
            }
            for (let i = 0; i < title.length; i++) {
                jobs.push(title[i])
            }
            console.log(jobs)
            return jobs
        }
    }
}
</script>

<style>
    .test {
        padding: 50px;
    }
</style>