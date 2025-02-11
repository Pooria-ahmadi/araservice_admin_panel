<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="bg-white p-6 rounded-lg shadow-lg md:mr-28">
          <div class="flex justify-between items-center">
            <p class="text-black font-bold">
              پذیرش ها
            </p>
            <div class="flex items-center gap-2">
              <p class="text-purple-400">مشاهده همه</p>
              <img src="/Left 1.png" alt="">
            </div>
          </div>
          <div class="flex mt-10 mb-10">
            <p class="text-gray-200 ml-2">
              تعداد کل
            </p>
            <p class="text-black font-bold">
              137 پذیرش
            </p>
          </div>
          <img src="/Frame 1364.png" alt="">
          <img src="/Frame 1365.png" alt="" class="my-4">
          <img src="/Frame 1366.png" alt="">
          <img src="/Frame 1367.png" alt="" class="my-4">
          <img src="/Frame 1368.png" alt="">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col items-start">
              <div class="flex flex-col">
                <div class="flex items-center">
                  <div class="w-10 border-b-2 border-red-500 mt-1 ml-2"></div>
                  <span class="ml-2 text-gray-800">عنوان</span>
                </div>
                <span class="text-gray-600 mt-1">متن زیر خط</span>
              </div>
            </div>
            <div class="flex flex-col items-start">
              <div class="flex flex-col">
                <div class="flex items-center">
                  <div class="w-10 border-b-2 border-red-500"></div>
                  <span class="ml-2 text-gray-800">عنوان</span>
                </div>
                <span class="text-gray-600 mt-1">متن زیر خط</span>
              </div>
            </div>
            <div class="flex flex-col items-start">
              <div class="flex flex-col">
                <div class="flex items-center">
                  <div class="w-10 border-b-2 border-red-500"></div>
                  <span class="ml-2 text-gray-800">عنوان</span>
                </div>
                <span class="text-gray-600 mt-1">متن زیر خط</span>
              </div>
            </div>
            <div class="flex flex-col items-start">
              <div class="flex flex-col">
                <div class="flex items-center">
                  <div class="w-10 border-b-2 border-red-500"></div>
                  <span class="ml-2 text-gray-800">عنوان</span>
                </div>
                <span class="text-gray-600 mt-1">متن زیر خط</span>
              </div>
            </div>
            <div class="flex flex-col items-start">
              <div class="flex flex-col">
                <div class="flex items-center">
                  <div class="w-10 border-b-2 border-red-500"></div>
                  <span class="ml-2 text-gray-800">عنوان</span>
                </div>
                <span class="text-gray-600 mt-1">متن زیر خط</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/6 bg-white p-6 rounded-lg shadow-lg md:mr-28">
          <p>
            sabkndsjk
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

const formData = ref({
  Fk_technician: "",
  Fk_Customer: "",
  Fk_devictype: "",
  Fk_device_brand: ""
});

const submitForm = async () => {
  try {
    console.log("📌 ارسال اطلاعات:", formData.value);

    const response = await axios.post("", formData.value);

    console.log("✅ پاسخ API:", response.data);
    alert("اطلاعات با موفقیت ارسال شد!");
  } catch (error) {
    console.error("❌ خطا در ارسال اطلاعات:", error);
    alert("ارسال اطلاعات ناموفق بود!");
  }
};
</script>