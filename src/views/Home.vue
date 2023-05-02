<template>
  <div class="container">
    <el-input
      v-model="val"
      placeholder="请输入待办事项"
      clearable
      class="input_box"
    />
    <el-button type="primary" @click="add">添加</el-button>
    <el-button type="primary" @click="search(val)">筛选</el-button>
  </div>
  <div v-for="(item, index) in todoList" :key="index" class="content_box">
    <el-checkbox v-model="item.completed" :label="item.name" size="large" />
    <el-button type="danger" class="del_box" @click="del(index)"
      >删除</el-button
    >
  </div>
 <div class="content_box">
  <el-checkbox v-model="checkedAll" @change="change(checkedAll)">
    已完成{{ count }}/全部:{{ todoList.length }}
  </el-checkbox>
  <el-button type="danger" @click="delAll">批量删除</el-button>
 </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const val = ref("");
const todoList = ref([
  { id: "1", name: "好好学习", completed: false },
  { id: "2", name: "好好吃饭", completed: false },
  { id: "3", name: "努力赚钱", completed: false },
]);
const checkedAll = ref(false);
const completedList = ref([]);
//添加
const add = () => {
  let obj = {
    id: Math.random(),
    name: val.value,
    completed: false,
  };
  if (obj.name) {
    todoList.value.push(obj);
  }
  val.value = "";
};
//全选
const change = (checkedAll) => {
  todoList.value.forEach((item) => {
    if (checkedAll) {
      item.completed = true;
    } else {
      item.completed = false;
    }
  });
};
const updateCount = () => {
  completedList.value = todoList.value.filter((item) => {
    return item.completed == true;
  });
};
///计算属性
const count = computed(() => {
  let num = 0;
  todoList.value.forEach((item) => {
    if (item.completed) {
      num++;
    }
  });
  return num;
});
//监听
watch(
  todoList,
  (oldVal, newVal) => {
    updateCount();
  },
  { deep: true }
);
//删除一个
const del = (index) => {
  todoList.value.splice(index, 1);
};
//删除多个
const delAll = () => {
  for (let i = todoList.value.length - 1; i >= 0; i--) {
    if (todoList.value[i].completed) {
      del(i);
    }
  }
};
//筛选（模糊查询）
const search = (op) => {
  if (op) {
    let searchList = [];
    todoList.value.filter((item) => {
      if (item.name.indexOf(op) != -1) {
        searchList.push(item);
      } 
    });
    console.log(searchList)
    todoList.value=searchList
  }
};
</script>

<style lang="scss">
.container {
  .input_box {
    width: 300px;
    margin-right: 10px;
  }
}

.content_box{
width: 440px;
margin-top: 20px;
display: flex;
justify-content: space-between;
.del_box {
  margin-left: 10px;
  display: block;
}
}
</style>