import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AsButtonModule } from './button.module';

platformBrowserDynamic().bootstrapModule(AsButtonModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
