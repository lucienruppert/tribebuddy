import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MethodComponent } from './components/method/method.component';
import { VideosComponent } from './components/videos/videos.component';
import { VisionComponent } from './components/vision/vision.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'method',
    component: MethodComponent,
  },
  {
    path: 'videos',
    component: VideosComponent,
  },
  {
    path: 'vision',
    component: VisionComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
