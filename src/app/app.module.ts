import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { VideosComponent } from './components/videos/videos.component';
import { MethodComponent } from './components/method/method.component';
import { MaterialModules } from './material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ShowVideoComponent } from './components/show-video/show-video.component';
import { VisionComponent } from './components/vision/vision.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    VideosComponent,
    MethodComponent,
    ShowVideoComponent,
    VisionComponent,
    HomeComponent,
    ServicesComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    FlexLayoutModule,
    YouTubePlayerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
