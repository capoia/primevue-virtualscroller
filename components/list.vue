<script setup>
const props = defineProps(['pipeId']);

const lazyItems = ref([]);
const lazyLoading = ref(false);
const virtualScrollerStages = ref();

onMounted(async () => {
  lazyLoading.value = true;

  const data = await $fetch('/api/pipe', {
    method: 'post',
    body: { limit: 4, page: 1 },
  });

  console.log('data onmounted', data);

  if (data)
    lazyItems.value = Array.from({
      length: data.meta.total ? data.meta.total : 0,
    });
});

async function onLazyLoad(event) {
  lazyLoading.value = true;

  const { first, last } = event;
  console.log({ first, last });
  if (first === 0) virtualScrollerStages.value?.scrollToIndex(0);

  const limit = 4;
  const page = Math.ceil(first / limit) + 1;

  const data = await $fetch('/api/pipe', {
    method: 'post',
    body: { limit, page },
  });

  console.log(data);

  if (data) {
    const _lazyItems = [...lazyItems.value];
    console.log({ _lazyItems });

    _lazyItems.splice(first, data.stages.length, ...data.stages);

    lazyItems.value = _lazyItems;
    console.log(lazyItems.value);
    return (lazyLoading.value = false);
  }

  return (lazyLoading.value = false);
}
</script>

<template>
  <div class="content w-[100%] overflow-y-scroll max-h-[100vh]">
    <div
      class="flex items-start justify-center p-5 pt-16 bg-gray-100 min-w-screen dark:bg-surface-800"
    >
      <div class="w-full min-h-body">
        <span v-if="!lazyItems">Loading...</span>
        <VirtualScroller
          v-else
          ref="virtualScrollerStages"
          :items="lazyItems"
          :item-size="280"
          orientation="horizontal"
          :step="2"
          style="width: 600px height: 300px"
          :pt="{ content: 'flex flex-row gap-3' }"
          show-loader
          :loading="lazyLoading"
          lazy
          @lazy-load="onLazyLoad"
        >
          <template #item="{ item, options }">
            <Card
              :pt-options="{ mergeSections: true, mergeProps: true }"
              :pt="{
                root: {
                  class:
                    'w-[280px] flex items-center animate__animated animate__fadeInLeft',
                },
              }"
            >
              <template #title>
                {{ item }}
              </template>
            </Card>
          </template>
        </VirtualScroller>
      </div>
    </div>
  </div>
</template>
