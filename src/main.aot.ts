import { platformBrowser }    from '@angular/platform-browser';
import { AsButtonModuleNgFactory } from './button.module.ngfactory';
import { enableProdMode } from '@angular/core';

console.log('Running in PROD mode');
enableProdMode();

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AsButtonModuleNgFactory);