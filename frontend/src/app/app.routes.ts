import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { ChooseSidekickComponent } from './choose-sidekick/choose-sidekick.component';

export const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'choose-sidekick', component: ChooseSidekickComponent },
];
