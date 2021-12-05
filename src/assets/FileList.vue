<template lang="pug">
.file-squares
    FileSquare(
        v-for='f in files' 
        :file="f" 
        :file_list_id="file_list_id")
    Loading.section(v-if="loading")
    button(@click="load" v-if="page+1!=pageTotal && !loading") more
</template>

<script>
import { defineComponent } from 'vue'

const request = require('@/services/axios')

export default defineComponent({
    mounted(){
        this.load()
    },
    props: {
        file_list_id: {
            type: String,
        },
    },
    data(){ return {
        loading: false,
        fileList: null,
        files: [],
        page: -1,
        pageTotal: 0,
    }},
    computed: {},
    methods: {
        async load(){
            this.loading = true
            this.page++
            try{
                const {data} = await request.get('/lists/files', {
                    params: {
                        file_list_id: this.file_list_id,
                        page: this.page,
                    },
                })

                this.page = data.info.page
                this.pageTotal = data.info.pageTotal
                this.files = this.files.concat(data.files)
                
            } catch(e){
                this.page--
                setTimeout(this.load, 1000)
            }
            this.loading = false
        },
    },
})
</script>

<style lang="sass">
@import "@/sass/main.sass"

#file-container
  padding-bottom: $gutter-medium * 2
  .header
    padding: $gutter-medium
    .parent-folder
      cursor: pointer
      *
        display: inline-block
        vertical-align: middle

      color: $color-6
      .text
        margin-left: 0.5em
    .name
      font-size: $font-size-3
      font-weight: bold

    
  .file-squares
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr))
    grid-gap: $gutter-smallest
    padding: $gutter-smallest
</style>
