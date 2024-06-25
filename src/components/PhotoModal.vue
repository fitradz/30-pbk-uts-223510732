<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"> 
    <q-card class="photo-modal">
      <q-btn icon="close" flat round dense @click="$emit('update:modelValue', false)" class="close-btn" />
      <q-img :src="photo.url" fit="contain" spinner-color="white" />
      <q-card-section class="text-center q-pa-md">
        <div class="text-h6">{{ photo.title }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['photo'],
  emits: ['update:modelValue'], // Add emits declaration for v-model event
};
</script>

<style lang="scss" scoped>
.photo-modal {
  width: 90vw; 
  max-width: 800px; 

  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 100;
  }
  .q-img {
    max-height: 80vh; 
  }
}
</style>

