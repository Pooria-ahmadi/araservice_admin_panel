import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: null,
  }),
  actions: {
    addTab(tab) {
      console.log(tab)
      if (!this.tabs.find((t) => t.pk_menu === tab.pk_menu))
        this.tabs.push(tab);
    },
    removeTab(tabId) {
      this.tabs = this.tabs.filter((t) => t.pk_menu !== tabId);
      if (this.activeTab === tabId)
        this.activeTab = this.tabs.length ? this.tabs[this.tabs.length - 1].id : null;
    },
  },
});
