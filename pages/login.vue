<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto">
                    <div>
                        <h1 class="text-2xl font-semibold">{{ $t('login_page.title') }}</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div class="py-8 leading-6 space-y-4 sm:leading-7">
                            <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues"
                                @submit="onFormSubmit" class="flex flex-col gap-4">
                                <div class="flex flex-col gap-1">
                                    <FloatLabel variant="on">
                                        <InputText name="email" type="text" placeholder="Email" fluid />
                                        <label>{{ $t('login_page.username') }}</label>
                                        <span v-if="$form.email?.invalid" class="text-red-500 text-xs">
                                            {{ $form.email.error?.message }}
                                        </span>
                                    </FloatLabel>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <FloatLabel variant="on">
                                        <Password name="password" toggleMask :feedback="false" fluid />
                                        <label>{{ $t('login_page.password') }}</label>
                                        <span v-if="$form.password?.invalid" class="text-red-500 text-xs">
                                            {{ $form.password.error?.message }}
                                        </span>
                                    </FloatLabel>
                                </div>
                                <div class="pt-8 text-center">
                                    <Button type="submit" severity="success" raised :loading="loadingStore.isLoading">
                                        <label class="px-6">{{ $t('login_page.submit_button') }}</label>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { useLoadingStore } from '@/stores/loading';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from "primevue/usetoast";
import { useI18n } from 'vue-i18n'; // 👈 اضافه کردن ایمپورت

const { t } = useI18n();
const loadingStore = useLoadingStore();
const { $servapi, $updateAuthHeader } = useNuxtApp();
const router = useRouter();
const toast = useToast();

const initialValues = ref({
    email: '',
    password: ''
});

const resolver = ref(zodResolver(
    z.object({
        email: z.string().min(1, { message: t('validation.email_required') }).email({ message: t('validation.email_invalid') }),
        password: z.string().min(1, { message: t('validation.password_required') })
    })
));

const onFormSubmit = async ({ values, valid }) => {
    if (valid) {
        try {
            const response = await $servapi.post('auth/login', {
                email: values.email,
                password: values.password,
            });
            const access_token = response.data.access_token;
            localStorage.setItem('jwt_token', access_token);
            $updateAuthHeader(access_token);
            router.push('/');
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Login failed!', detail: error.response?.data?.message, life: 3000 });
        }
    }
};
</script>