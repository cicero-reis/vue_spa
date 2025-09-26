<template>
    <nav class="mt-4" v-if="props.meta.total_pages > 1">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: props.meta.current_page === 1 }"
                @click.prevent="changePage(props.meta.current_page - 1)">
                <a class="page-link" href="#">Previous</a>
            </li>

            <li v-for="page in totalPagesArray" :key="page" class="page-item"
                :class="{ active: props.meta.current_page === page }" @click.prevent="changePage(page)">
                <a class="page-link" href="#">{{ page }}</a>
            </li>

            <li class="page-item" :class="{ disabled: props.meta.current_page === props.meta.total_pages }"
                @click.prevent="changePage(props.meta.current_page + 1)">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>props

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task';

const store = useTaskStore()

const { handleListTask } = store

const props = defineProps({
    meta: Object
})

const totalPagesArray = computed(() => {
  return Array.from({ length: props.meta.total_pages }, (_, i) => i + 1)
})

const changePage = async (page) => {
    if (page < 1 || page > props.meta.total_pages) return
        await handleListTask(page)
}

</script>