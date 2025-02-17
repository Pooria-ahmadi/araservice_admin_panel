<template>
    <section>
        <div class="card mt-2">
            <Button class="mx-2" size="small" v-tooltip.top="'Ctrl + P'" severity="secondary">
                <small>
                    {{ $t('toolbar.print') }}
                </small>
                <Icon name="uil:print" style="font-size: 16px;" />
            </Button>
            <Button class="mx-2" size="small" v-tooltip.top="'Ctrl + L'" severity="secondary">
                <small>
                    {{ $t('toolbar.list') }}
                </small>
                <Icon name="uil:list-ul" style="font-size: 16px;" />
            </Button>
            <Button class="mx-2" size="small" v-tooltip.top="'Ctrl + R'" severity="secondary">
                <small>
                    {{ $t('toolbar.refresh') }}
                </small>
                <Icon name="uil:refresh" style="font-size: 16px;" />
            </Button>
            <Button class="mx-2" disabled size="small" v-tooltip.top="'Ctrl + N'" severity="secondary">
                <small>
                    {{ $t('toolbar.note') }}
                </small>
                <Icon name="uil:refresh" style="font-size: 16px;" />
            </Button>
            <Button class="mx-2" disabled size="small" v-tooltip.top="'Ctrl + G'" severity="secondary">
                <small>
                    {{ $t('toolbar.guide') }}
                </small>
                <Icon name="uil:question-circle" style="font-size: 16px;" />
            </Button>
            <hr class="mt-3" />
        </div>
    </section>
</template>
