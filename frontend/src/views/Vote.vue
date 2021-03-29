<template>
  <div>
    <alert-message v-if="message" :alert-message="message" :alert-type="alertType"></alert-message>
    <h1>{{ $t('voteQuestion') }}</h1>
    <button v-for="value in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="value" @click="setVoteValue(value)" type="button"
            :class="currentVote(value)" :disabled="alreadyVoted"> {{ value }}
    </button>
    <br><br>
    <button @click="submit" type="button" class="btn btn-success" :disabled="alreadyVoted || !voteValue">{{
        $t('submit')
      }}
    </button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import { useI18n } from "vue-i18n";

export default {
  name: "Vote",
  components: { AlertMessage },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const message = ref(null);
    const alertType = ref(null);
    const submit = () => {
      axios.post('/vote', { value: store.state.voteValue })
          .then(() => {
            store.dispatch('submit', store.state.voteValue);
            message.value = t('voteSuccessMessage');
            alertType.value = 'success';
            setTimeout(() => {
              message.value = null;
              alertType.value = null;
            }, 5000);
          })
          .catch(() => {
            message.value = t('voteFailureMessage');
            alertType.value = 'error';
            setTimeout(() => {
              message.value = null;
              alertType.value = null;
            }, 5000);
          });
    }
    const currentVote = (value) => {
      if (value === store.state.voteValue) {
        return 'btn btn-success vote';
      }
      return 'btn btn-primary vote'
    };

    return {
      message,
      alertType,
      voteValue: computed(() => store.state.voteValue),
      alreadyVoted: computed(() => store.state.alreadyVoted),
      setVoteValue: (voteValue) => {
        if (!store.state.alreadyVoted) {
          store.commit('setVoteValue', voteValue)
        }
      },
      submit,
      currentVote
    }
  }
}
</script>

<style scoped>
.vote {
  margin: 5px;
}
</style>