<template>
  <div>
    通讯录
    <div >
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
    <h1 class="text-gray-900 dark:text-white">Dark mode is here!</h1>
    <div>
      <button class="bg-red-500 hover:bg-blue-700 active:bg-green-700 ">
        Hover me(伪类)
      </button>
    </div>
    <div>
      <button class="btn-blue">tailwind aply按钮</button>
    </div>
    <button class="or_btn">自定义样式 按钮</button>
  </div>
</template>

<script src="./addressBook.js"></script>

<style scoped src="./addressBook.css">