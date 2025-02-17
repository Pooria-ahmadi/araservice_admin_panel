<template>
    <section>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 mb-3">
            <div class="text-sm">
                {{ $t('date') }}
            </div>
            <div class="text-sm">
                {{ $t('acceptance_time') }}
            </div>
            <div class="text-sm">
                {{ $t('issuer') }}
            </div>
            <div class="text-sm">
                {{ $t('acceptance_number') }}
            </div>
        </div>
    </section>
</template>
