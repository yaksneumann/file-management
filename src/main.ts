import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { errorInterceptor } from './app/error.interceptor';

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([errorInterceptor])
    )
  ]
}).catch(err => console.error(err));
