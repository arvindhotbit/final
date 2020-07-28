import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterlistManagementComponent } from './interlist-management/interlist-management.component';
import { InternallistDefinationComponent } from './interlist-management/internallist-defination/internallist-defination.component';
import { InternallistWatchlistComponent } from './interlist-management/internallist-watchlist/internallist-watchlist.component';
import { BlacklistBicComponent } from './blacklist-bic/blacklist-bic.component';
import { NeutralWordsComponent } from './neutral-words/neutral-words.component';
import { SanctionedCitiesComponent } from './sanctioned-cities/sanctioned-cities.component';
import { HighRiskCountriesComponent } from './high-risk-countries/high-risk-countries.component';
import { ZoneVsGlobalComponent } from './zone-vs-global/zone-vs-global.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteGoodGuyComponent } from './delete-good-guy/delete-good-guy.component';
import { MatchScoreComponent } from './match-score/match-score.component';
import { NameScreeningFieldsComponent } from './name-screening-fields/name-screening-fields.component';
import { SensitiveWordComponent } from './sensitive-word/sensitive-word.component';
import { PaymentScreeningForAdkComponent } from './payment-screening-for-adk/payment-screening-for-adk.component';
import { PepComponent } from './pep/pep.component';
import { CaseListingComponent } from './case-listing/case-listing.component';
import { AddzoneComponent } from './addzone/addzone.component';

import { ActivateGuard } from './activate.guard';
const routes: Routes = [
      {path: 'internamanagement', component: InterlistManagementComponent },
      {path: 'internallist', component: InternallistDefinationComponent },
      {path: 'internawatchlist', component: InternallistWatchlistComponent },
      {path: 'blacklistedbic', component: BlacklistBicComponent },
      {path: 'highriskcountries', component: HighRiskCountriesComponent },
      {path: 'neutralwords', component: NeutralWordsComponent },
      {path: 'sanctionedcities', component: SanctionedCitiesComponent },
      {path: 'zonevsglobal', component: ZoneVsGlobalComponent },
      {path: 'register', component: RegisterComponent },
      {path: 'login', component: LoginComponent},
      {path: '', component: LoginComponent},
      {path: 'home', component: DashboardComponent,canActivate : [ActivateGuard] },
      {path: 'delete_good_guy', component:DeleteGoodGuyComponent},
      {path: 'match-score-threshold', component:MatchScoreComponent},
      {path: 'name-screen', component:NameScreeningFieldsComponent},
      {path: 'sensitive-word', component:SensitiveWordComponent},
      {path: 'politicaly-Exposed-Person', component:PepComponent},
      {path: 'payment-screen-adk', component:PaymentScreeningForAdkComponent},
      {path: 'add-zone', component:AddzoneComponent},
      {path: 'case-listing', component:CaseListingComponent}
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
