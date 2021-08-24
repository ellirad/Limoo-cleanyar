<template>
  <div class="text-center">
    <v-overlay :value="overlay" z-index="1000">
      <v-progress-circular
        indeterminate
        :width="5"
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      overlay: "overlay",
    }),
  },
};
</script>
