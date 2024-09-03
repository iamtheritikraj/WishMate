chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install" || details.reason === "update") {
      initializeExtension();
    }
  });
  

  function initializeExtension() {
    chrome.storage.sync.set({
      shoppingLists: { 'Default': [] },
      settings: {
        notifications: true,
        autoCapture: false
      }
    }, () => {
      console.log("Shop Together extension initialized");
    });
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case "productCaptured":
        handleProductCapture(request.product, sender.tab.id);
        break;
      case "getProductCount":
        getProductCount(sendResponse);
        return true; 
      case "clearAllData":
        clearAllData(sendResponse);
        return true;
    }
  });
  
  function handleProductCapture(product, tabId) {
    chrome.storage.sync.get(['shoppingLists', 'settings'], (data) => {
      const lists = data.shoppingLists || { 'Default': [] };
      const currentList = lists['Default'];
      
      const isDuplicate = currentList.some(item => item.url === product.url);
      
      if (!isDuplicate) {
        currentList.push(product);
        chrome.storage.sync.set({ shoppingLists: lists }, () => {
          if (data.settings.notifications) {
            notifyProductCaptured(product, tabId);
          }
          updateBadge(currentList.length);
        });
      } else {
        console.log("Product already in the list");
      }
    });
  }
  

  function notifyProductCaptured(product, tabId) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png', 
      title: 'Product Captured',
      message: `${product.name} has been added to your shopping list.`
    });
  }

  function updateBadge(count) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
  }
  

  function getProductCount(sendResponse) {
    chrome.storage.sync.get('shoppingLists', (data) => {
      const lists = data.shoppingLists || {};
      let totalCount = Object.values(lists).reduce((count, list) => count + list.length, 0);
      sendResponse({ count: totalCount });
    });
  }
  

  function clearAllData(sendResponse) {
    chrome.storage.sync.clear(() => {
      initializeExtension();
      sendResponse({ success: true });
    });
  }
  
  // Optional: Implement periodic sync with a backend server
  // This is a placeholder and would need to be implemented with your actual backend
  function syncWithServer() {
    // Implement your sync logic here
    console.log("Syncing with server...");
  }
  
  // Set up periodic sync (every 30 minutes)
  chrome.alarms.create('syncAlarm', { periodInMinutes: 30 });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'syncAlarm') {
      syncWithServer();
    }
  });
  
  // Listen for tab updates to implement auto-capture if enabled
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.sync.get('settings', (data) => {
        if (data.settings.autoCapture) {
          chrome.tabs.sendMessage(tabId, { action: "autoCapture" });
        }
      });
    }
  });