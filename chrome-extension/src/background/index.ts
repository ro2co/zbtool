import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     console.log('onBeforeRequest triggered', details);
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       if (tabs.length > 0 && tabs[0] !== undefined && typeof tabs[0].id === 'number') {
//         if (tabs[0].id !== undefined) {
//           chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             files: ['content.js']
//           }, function() {
//             chrome.tabs.sendMessage(tabs[0].id!, { url: details.url });
//           });
//         }
//       }
//     });
//   },
//   { urls: ['<all_urls>'] }
// );
