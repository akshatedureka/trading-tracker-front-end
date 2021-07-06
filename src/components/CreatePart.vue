<template>
  <div class="home">
    <div class="d-flex justify-center mb-6">
      <v-card class="elevation-12" min-width="800">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Create New Part</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form>
            <v-text-field
              v-model="partNumberInput"
              :error-messages="partNumberErrors"
              :counter="40"
              label="Part Number"
              required
              @input="$v.partNumberInput.$touch()"
              @blur="$v.partNumberInput.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="partDescription"
              :error-messages="emailErrors"
              label="Part Description"
              required
              @input="$v.partDescription.$touch()"
              @blur="$v.partDescription.$touch()"
            ></v-text-field>
            <v-combobox
              v-model="selectedPartType"
              :items="partTypes"
              item-text="name"
              label="Part Type"
            ></v-combobox>
            <v-btn class="mr-4" @click="submit"> submit </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Part",
  props: {
    msg: String,
  },
  validations: {
    partNumberInput: { required, maxLength: maxLength(40) },
  },
  data() {
    return {
      parts: [],
      partNumber: "",
      partDescription: "",
      selectedPartType: "",
      partPostResponse: "",
      search: "",
      partNumberInput: "",
      partTypes: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:45456/partservice/parttypes")
      .then((response) => (this.partTypes = response.data));
  },
  methods: {
    submit() {
      if (!this.$v.$error) {
        axios
          .post("http://localhost:45456/partservice/parts", {
            partNumber: this.partNumberInput,
            partDescription: this.partDescription,
            partTypeId: this.selectedPartType.id,
          })
          .then((response) => (this.partPostResponse = response.data));
      }
    },
  },
  computed: {
    partNumberErrors() {
      const errors = [];
      if (!this.$v.partNumberInput.$dirty) return errors;
      !this.$v.partNumberInput.maxLength &&
        errors.push("Part Number must be at most 40 characters long");
      !this.$v.partNumberInput.required &&
        errors.push("Part Number is required.");
      return errors;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.get-started {
  padding-top: 20px;
  font-size: 25px;
}
</style>

