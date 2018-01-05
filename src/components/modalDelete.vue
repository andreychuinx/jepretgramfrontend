<template>
  <b-modal :v-model="show">
      Hello From Modal!
    </b-modal>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        name: null,
        description: null
      }
    },
    name: 'modaldelete',
    props: ['title', 'data', 'show'],
    // methods: {
    //   deleteTodoMethod() {
    //     console.log('method delete todo')
    //     this.$store.dispatch('deleteTodo', {
    //       id: this.data._id
    //     })
    //     this.$emit('close')
    //   }
    // },
    // computed: {
    //   ...mapGetters(['throwDeleteTodo'])
    // }
  }
</script>