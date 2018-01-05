<template>

  <div class="container">
    <header-template>
    </header-template>
    <div class="col-lg-12 col-md-12 col-xs-6">
      <b-form @submit="onSubmit" >
        <b-form-group id="exampleInputGroup1" label="Photo" label-for="exampleInput1">
          <b-form-file id="file_input1" v-model="photo"></b-form-file>
        </b-form-group>
        <b-form-group label="caption">
          <b-form-textarea id="textarea1" v-model="caption" placeholder="Enter something" :rows="3" :max-rows="6" label="caption">
        </b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>

  </div>
</template>

<script>
import headerTemplate from "./header"
export default {
  name: "postPage",
  components: {
    headerTemplate,
  },
  data() {
    return {
      photo: null,
      caption: ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.$store.dispatch('postPhoto', {
        image : this.photo,
        caption : this.caption
      })
      // console.log(this.photo)
    }
  }
};
</script>

<!-- b-form-1.vue -->