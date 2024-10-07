<template>
    <div
      id="core-value-widget"
      data-apikey="your api key"
      data-type="project_architect"
      data-lang="de-CH"
      data-csspath="/demo-client.css"
      :data-entry="projectDetails"
      :meta-entry="projectMeta"
      data-callback="onSaveProject"></div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { loadWidget, unloadWidget } from '@/init-core-widget';


onMounted(() => {
  /* make saveProject globally available in window object */
  if (!(window as any)['onSaveProject']) {
    (window as any)['onSaveProject'] = saveProject;
  }
  loadWidget('production');
});
onBeforeUnmount(() => {
  unloadWidget();
});

const projectDetails = computed(() => {
  /* return project if exists */
  return null;
});

const projectMeta = computed(() => {
  /* return meta data of project if exists, else use default meta-data */
  return JSON.stringify({
    canEdit: true,
    canView: true,
    isGP: false,
    parts: ['ARCHITECT'],
    roles: ['ARCHITECT'],
    title: "Demo Project 101",
    userId: "2b20d807-ea49-4fbf-8149-033f009da74c",
  });
});

const saveProject = (data: any) => {
  console.log('client should save projectData now and handle success message: ', JSON.parse(data.data));
};
</script>

<style>
.core-value-container {
  padding: 0;
}
#core-value-widget {
  height: 100%;
  width: 100%;
  iframe {
    border: none;
    width: 100%;
    min-height: 739px;
  }
}
</style>
