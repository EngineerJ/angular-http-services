import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PagenotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgProgressModule
  ],
  providers: [
    PostService,
    { provide:ErrorHandler, useClass: AppErrorHandler },
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
