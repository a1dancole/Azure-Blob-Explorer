import { NgModule, APP_INITIALIZER, ModuleWithProviders } from "@angular/core";
import { ComponentsModule} from './components/components.module'
import { SafeUrlPipe } from './safeUrlPipe/safeUrl.pipe';
import { SettingsService } from './settings/settings.service';
import { HttpClient } from './httpClient/httpClient.service';

export function initApp(settingsService: SettingsService) {
    return () => settingsService.initialise();
  }

  
@NgModule({
    declarations: [
        SafeUrlPipe
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        ComponentsModule,
        SafeUrlPipe
    ],
    providers: [
        HttpClient,
        SettingsService,
        {
          provide: APP_INITIALIZER,
          useFactory: initApp,
          deps: [SettingsService],
          multi: true
        },
      ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                SettingsService,
                HttpClient
            ]
        };
    }
 }