import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: null,
  }),
  actions: {
    addTab(tab) {
      if (!this.tabs.find((t) => t.id === tab.id)) {
        this.tabs.push(tab);
      }
      this.activeTab = tab.id;
    },
    removeTab(tabId) {
      this.tabs = this.tabs.filter((t) => t.id !== tabId);
      if (this.activeTab === tabId) {
        this.activeTab = this.tabs.length ? this.tabs[this.tabs.length - 1].id : null;
      }
    },
  },
});
