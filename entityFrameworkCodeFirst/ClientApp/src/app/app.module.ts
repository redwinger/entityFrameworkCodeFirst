import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TripManager } from './Trips/TripManagement/components/trip-manager.component';
import { TripEditor } from './Trips/TripEditor/components/trip-editor.component';
import { TripService } from './api/trip-service';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from './Trips/Common/components/loader/loader.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        TripManager,
        TripEditor,
        LoaderComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', component: TripManager, pathMatch: 'full' },

        ])
    ],
    providers: [
        TripService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
