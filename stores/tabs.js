import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],

    tabCounter: 1,

    activeTab: null,
  }),
  actions: {
    addTab(tab) {
      const similarTabs = this.tabs.filter((t) => t.pk_menu === tab.pk_menu);
      const tabSuffix = similarTabs.length + 1;
      const tabId = `${tab.pk_menu}-${tabSuffix}`;

      const newTab = {
        ...tab,
        id: tabId,
        suffix: tabSuffix,
      };

      this.tabs.push(newTab);
      this.activeTab = tabId;
    },
    removeTab(tabId) {
      this.tabs = this.tabs.filter((t) => t.id !== tabId);
      const lastTab = this.tabs.length ? this.tabs[this.tabs.length - 1].id : null;
      setTimeout(() => {
        this.setActiveTab(lastTab);
      }, 100);
    },

    setActiveTab(tabId) {
      this.activeTab = tabId
    }
  },
});
