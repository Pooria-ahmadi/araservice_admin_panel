import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: null,
  }),
  actions: {
    addTab(tab) {
      if (!this.tabs.find((t) => t.pk_menu === tab.pk_menu))
        this.tabs.push(tab);
      this.activeTab = tab.pk_menu
    },
    removeTab(pk_menu) {
      this.tabs = this.tabs.filter((t) => t.pk_menu !== pk_menu);
      var activeTab

      if (this.activeTab === pk_menu)
        activeTab = this.tabs.length ? this.tabs[this.tabs.length - 1].pk_menu : null;
      else
        activeTab = 1

      activeTab = activeTab.toString()

      setTimeout(() => {
        this.setActiveTab(activeTab)
      }, 100);
    },

    setActiveTab(tabId) {
      this.activeTab = tabId
    }
  },
});
