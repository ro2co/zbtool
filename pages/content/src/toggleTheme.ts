import { exampleThemeStorage } from '@extension/storage';

export async function toggleTheme() {
  console.log('initial theme2:', await exampleThemeStorage.get());
  await exampleThemeStorage.toggle();
  console.log('toggled theme2:', await exampleThemeStorage.get());
}
