import { toggleTheme } from '@src/toggleTheme';
import { test } from './test';
console.log('content script loaded');

// window.addEventListener('NetworkListenerEvent', (event) => {
//     console.log('NetworkListenerEvent', (event as CustomEvent).detail);
//     chrome.runtime.sendMessage((event as CustomEvent).detail);
//   });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // Forward the message from background.js to content-ui
//     console.log("message", message)
//     window.postMessage(message, '*');
// });
void test();
