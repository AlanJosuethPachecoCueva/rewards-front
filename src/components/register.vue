<script>
import { computed } from "vue";

export default {
  data() {
    return {};
  },
  components: {
    
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    handleContacts() {
      //   this.$router.push("/contacts");
    },
    async signOut() {
      //   try {
      //     await logOutGoogle();
      //     window.location.reload();
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
  },
  mounted() {
    // const store = useUserStore();
    // const user = computed(() => {
    //   return store.getUser;
    // });
    // console.log("User at navBar: ", user);
    // return { user };
  },
};
</script>

<template>
  <div>register</div>
</template>

<style>

</style>
