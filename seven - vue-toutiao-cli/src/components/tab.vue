<template>
    <div>
        <div v-for="item in innerTabs" class="item" v-bind:key="item.key">
            {{item.title}}
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['tabs']
    }
</script>

// 单测
