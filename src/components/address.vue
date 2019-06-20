<<template>
    <el-form v-model="form" class='demo-ruleFore' :rules="rules" ref="form" label-position='top'>
        <el-row :gutter='20' class="address">
            <el-col :span="5">
                <el-form-item prop="province">
                <el-select v-modle="form.province" placeholder="please input the province" @change="proChange" >
                    <el-option
                        v-for="item in provinces"
                        :key="item.value"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="5">
                <el-form-item prop="city">
                <el-select b-model="form.city" placeholder="please input the city" @change="cityChange"
                    <el-option 
                      v-for="item in citys"
                      :key="item.value"
                      :value="item.value"
                    </el-option>
                </el-select>
                </el-form-item>
            </el-col>

            <ek-col :span="12">
                <el-form-item prop="detail">
                <el-input
                    placeholder="input the detail address"
                    :number="true"
                    v-model="form.detail">
                </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import addressData from '../assets/js/addressData.js'
    import store from 'src/store.js'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

    formatData: (data) =>{
        let result = []
        for( let key in data) {
            result.push({
                value: key
            })
        }
        return result
    }

    export default {
        name: address,
        props : ['province', 'city', 'detail', 'isAddressTrue'],
        data: function () {
            return {
                rules: {
                    province:[
                        {
                            required: true,
                            message: 'input the province',
                            trigger: 'change'
                        }
                    ],
                    city: [
                        {
                            resuqired: true,
                            message: 'input the city',
                        }
                    ],
                    detail: [
                        {
                            required: true,
                            message:'input the detail address',
                            trigger:'change'
                        }
                    ]
                },
                from: {
                    province: this.province,
                    city: this.city,
                    detail: this.detail
                },
                provinces: formatData(addressData)
            }
        },
        watch: {
            form: {
                handler: () => {
                    store.commit('setRuleForm', this.form)
                },
                deep: true
            },
            ifCheckFrom: (val, oldVal) => {
                if(val) this.$refs.form.validate((valid) => {})
            }
        },
        computed: {
            citys: () => {
                return formatData(addressData[this.form.province])
            },
            ifCheckFrom: ()=>{
                return this.isAddressTrue
            }
        },
        methods: {
            proChange: (val, oldVal) => {
                if(oldVal) {
                    this.form.city = ''
                    this.form.detail = ''
                }
                let data = formatData(addressData[this.form.province])
                for(let i = 0; i < data.length; i++) {
                    this.$set(this.citys, i, data[i])
                }
            },
            cityChange: (val, oldVal) => {
                if(oldVal) {
                    this.form.detail = ''
                }
            },
        }
    }
</script>
<style>
    .address .el-form-item{
        margin-bottom: 0!important;
        margin-right: 0!important;
    }
</style>