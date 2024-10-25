import React from 'react';
// import './Tools.css';

export function Tools() {
  const setCookie = (name: string, value: string) => {
    chrome.cookies.set({ url: 'http://localhost:3000', name, value });
  };
  const removeCookie = () => {
    chrome.cookies.remove({ url: 'http://localhost:3000', name: 'mysphw' });
    chrome.cookies.remove({ url: 'http://localhost:3000', name: 'mySPHUserType' });
  };

  const viewRequest = (env: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        console.log('Current URL:', currentTab.url);
        const url = new URL(currentTab.url);

        const pathname = url.pathname;

        let apiUrl, host;
        if (env === 'local') {
          host = 'localhost:3000';
        }
        if (env === 'staging') {
          host = 'web2-stg.zaobao.com.sg';
        }
        if (env === 'prd') {
          host = 'web2-prd.zaobao.com.sg';
        }
        const isPageContent =
          pathname.includes('story') || pathname.includes('byline') || pathname.includes('publication');
        if (isPageContent) {
          apiUrl = 'http://' + host + '/_plat/api/v2' + pathname;
        } else {
          apiUrl = 'http://' + host + '/_plat/api/v2/page-content' + pathname;
        }

        console.log(apiUrl);
        chrome.tabs.create({ url: apiUrl });
      }
    });
  };
  const request = async () => {
    const url = 'https://api.example.com/data'; // 替换为你的接口地址
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('请求失败:', error);
    }
  };

  const viewDocument = async () => {
    async function getCurrentTab() {
      const queryOptions = { active: true, currentWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
    const tab = await getCurrentTab();
    console.log(chrome.scripting);
    if (tab && tab.id) {
      try {
        const result = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const searchText = 'clicked';
            const replaceText = 'should';
            document.body.innerHTML = document.body.innerHTML.split(searchText).join(replaceText);
            // const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3}Z)?|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g;
            // const timezoneOffset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
            // const matches = document.body.innerHTML.match(regex);
            // console.log(matches);
            // let newDate;
            // document.body.innerHTML = document.body.innerHTML.replace(regex, match => {
            //   const date = new Date(match);
            //   newDate = new Date(date.getTime() + timezoneOffset);
            //   return newDate.toISOString().replace('.000Z', '').replace('T', ' ');
            // });

            // return newDate;
          },
        });
        console.log('Result:', result);
      } catch (error) {
        console.error('Error executing script:', error);
      }
    }
  };
  return (
    <>
      <div className="tools-box">
        <button
          onClick={() => {
            setCookie('mysphw', 'test1234');
            setCookie('mySPHUserType', 'y-sub');
          }}>
          Set User
        </button>
        <button onClick={() => removeCookie()}>Clear </button>
      </div>
      <div className="tools-box">
        <button onClick={() => viewRequest('local')}>View Local1</button>
        <button onClick={() => viewRequest('staging')}>View Staging1</button>
      </div>
      <div className="tools-box">
        <button onClick={() => viewRequest('local')}>Document</button>
        <button onClick={() => viewRequest('staging')}>View Staging</button>
      </div>
      <div className="tools-box">
        <button onClick={() => request()}>Request</button>
        <button onClick={() => viewDocument()}>viewDocument3</button>
      </div>
    </>
  );
}
