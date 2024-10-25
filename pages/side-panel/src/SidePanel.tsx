import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';
import { Tools, Network, Caas } from './components';

const SidePanel = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'side-panel/logo_vertical.svg' : 'side-panel/logo_vertical_dark.svg';

  const [currentComponent, setCurrentComponent] = useState('Tools');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Tools':
        return <Tools />;
      case 'Network':
        return <Network />;
      case 'Caas':
        return <Caas />;
      default:
        return null;
    }
  };

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      {/* <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
      </header> */}
      <div className="box-title">
        <div>
          <button className="w-[100%]" onClick={() => setCurrentComponent('Tools')}>
            Tools
          </button>
        </div>
        <div>
          <button className="w-[100%]" onClick={() => setCurrentComponent('Network')}>
            Network
          </button>
        </div>
        <div>
          <button className="w-[100%]" onClick={() => setCurrentComponent('Caas')}>
            Caas
          </button>
        </div>
      </div>
      {renderComponent()}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
