<template>
    <div id="app">
        <el-cascader
            style="width: 270px;"
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
        </el-cascader>
    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data'
    export default {
        data () {
            return {
                options: regionData,
                selectedOptions: []
            }
        },
        methods: {
            handleChange (value) {
                this.selectedOptions = value;
                console.log(this.selectedOptions)
            }
        }
    }
</script>
