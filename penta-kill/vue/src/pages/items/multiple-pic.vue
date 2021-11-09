<template>
     <div class="item multile-pic">
        <div class="content">
            <span>
                {{item.data.title}}
            </span>
        </div>
    </div>
    </div class="image-list">
        <img
            v-for="imagePath in item.data.imageList"
            v-bind:src="imagePath"
        />
    </div>
</template>

<script>
export default {
    props: [item],
    data() {
        return {
            list: []  
        };
    },
    create() {
        
    }
}
</script>