<template>
  <div class="home">
    <div class="d-flex justify-center mb-6">
      <v-data-table
        :headers="headers"
        :items="parts"
        item-key="index"
        class="elevation-1"        
      >
        <!--         <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Parts List"
            class="mx-4"
          ></v-text-field>
        </template> -->
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "SearchPart",
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
      partType: "",
      partPostResponse: "",
      search: "",
      partNumberInput: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:45456/partservice/parts")
      .then((response) => (this.parts = response.data));
  },
  methods: {
    submit() {
      if (!this.$v.$error) {
        axios
          .post("http://localhost:45456/partservice", {
            partNumber: this.partNumberInput,
            partDescription: this.partDescription,
          })
          .then((response) => (this.partPostResponse = response.data));
      }
    },
  },
  computed: {
    headers() {
      return [
        { text: "Part Number", value: "partNumber" },
        { text: "Part Description", value: "partDescription" },
        { text: "Part Type", value: "partType.name" },
      ];
    },
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

.robot {
  height: 300px;
}

.get-started {
  padding-top: 20px;
  font-size: 25px;
}
</style>

