<!--
 * @Author: zhouyanheng
 * @Date: 2021-07-26 19:39:27
 * @LastEditTime: 2021-08-02 16:10:10
 * @LastEditors: zhouyanheng
 * @FilePath: \gzdt_ms\src\views\application\Application.vue
-->
<template>
  <div>
    <div v-for="item in theme" :key="item">
      <button
        @click="changeTheme(item)"
        class="
          py-2
          px-4
          bg-blue-500
          text-white
          font-semibold
          rounded-lg
          shadow-md
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2 focus:ring-blue-400 focus:ring-opacity-7
          flex
        "
      >
        {{ item }}
      </button>
    </div>
    <div>
      <div class="bg-inverse font-body">
        <div class="container mx-auto px-4">
          <div class="py-16 text-center">
            <div class="mb-6">
              <h1 class="font-display text-inverse font-light text-5xl mb-4">
                Our Big Awesome Headline
              </h1>
              <p class="font-normal text-inverse-soft text-2xl">
                The subheadline that comes after the headline.
              </p>
            </div>
            <div>
              <button
                type="button"
                class="
                  font-body
                  rounded-btn
                  text-xl
                  font-medium
                  bg-primary
                  text-primary
                  px-6
                  py-3
                  mr-2
                "
              >
                Main Action
              </button>
              <button
                type="button"
                class="
                  font-body
                  rounded-btn
                  text-xl
                  font-medium
                  bg-secondary
                  text-secondary
                  px-6
                  py-3
                "
              >
                Secondary Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./application.js"></script>
<style scoped src="./application.css">