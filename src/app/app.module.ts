import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { InterlistManagementComponent } from './interlist-management/interlist-management.component';
import { InternallistDefinationComponent } from './interlist-management/internallist-defination/internallist-defination.component';
import { InternallistWatchlistComponent } from './interlist-management/internallist-watchlist/internallist-watchlist.component';

import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { BlacklistBicComponent } from './blacklist-bic/blacklist-bic.component';
import { NeutralWordsComponent } from './neutral-words/neutral-words.component';
import { SanctionedCitiesComponent } from './sanctioned-cities/sanctioned-cities.component';
import { HighRiskCountriesComponent } from './high-risk-countries/high-risk-countries.component';
import { ZoneVsGlobalComponent } from './zone-vs-global/zone-vs-global.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule} from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivateGuard } from './activate.guard';
import { MatchScoreComponent } from './match-score/match-score.component';
import { ExPaymentScreeningComponent } from './ex-payment-screening/ex-payment-screening.component';
import { DeleteGoodGuyComponent } from './delete-good-guy/delete-good-guy.component';
import { NameScreeningFieldsComponent } from './name-screening-fields/name-screening-fields.component';
import { PaymentScreeningForEPHComponent } from './payment-screening-for-eph/payment-screening-for-eph.component';
import { PaymentScreeningForAdkComponent } from './payment-screening-for-adk/payment-screening-for-adk.component';
import { CaseListingComponent } from './case-listing/case-listing.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
// import { FilterPipe } from './filter/filter.pipe';
import { AuthserviceService } from './auth/authservice.service';
import { NeutralfilterPipe } from './filter/neutralfilter.pipe';
import { HeaderComponent } from './header/header.component';
import { SensitiveWordComponent } from './sensitive-word/sensitive-word.component';
import { SensitivefilterPipe } from './filter/sensitivefilter.pipe';
import { PepComponent } from './pep/pep.component';
import { PsadkPipe } from './filter/psadk.pipe';
import { NamescreenPipe } from './filter/namescreen.pipe';
 import { CaselistPipe } from './filter/caselist.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddzoneComponent } from './addzone/addzone.component';

@NgModule({
  declarations: [
    AppComponent,
    InterlistManagementComponent,
    InternallistDefinationComponent,
    InternallistWatchlistComponent,
    BlacklistBicComponent,
    NeutralWordsComponent,
    SanctionedCitiesComponent,
    HighRiskCountriesComponent,
    ZoneVsGlobalComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MatchScoreComponent,
    ExPaymentScreeningComponent,
    DeleteGoodGuyComponent,
    NameScreeningFieldsComponent,
    PaymentScreeningForEPHComponent,
    PaymentScreeningForAdkComponent,
    CaseListingComponent,
    CaseDetailComponent,
    // FilterPipe,
    NeutralfilterPipe,
    HeaderComponent,
    SensitiveWordComponent,
    SensitivefilterPipe,
    PepComponent,
    PsadkPipe,
    NamescreenPipe,
     CaselistPipe,
     AddzoneComponent

  ],
  imports: [ 
    MbscModule, 
    BrowserModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot(), // ToastrModule added
    LoadingBarRouterModule,
    LoadingBarModule,
    LoadingBarHttpClientModule
  ],
  providers: [ActivateGuard,AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
