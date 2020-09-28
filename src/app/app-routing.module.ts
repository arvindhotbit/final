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

import { MatchScoreComponent } from './match-score/match-score.component';
import { NameScreeningFieldsComponent } from './name-screening-fields/name-screening-fields.component';
import { SensitiveWordComponent } from './sensitive-word/sensitive-word.component';
import { PaymentScreeningForAdkComponent } from './payment-screening-for-adk/payment-screening-for-adk.component';
import { PepComponent } from './pep/pep.component';
import { CaseListingComponent } from './case-listing/case-listing.component';
import { AddzoneComponent } from './admin/addzone/addzone.component';
import { DepartmentComponent } from './admin/department/department.component';
import { PaysysComponent } from './admin/paysys/paysys.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { ActivateGuard } from './activate.guard';
import { DeactivateGuard } from './deactivate-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoleManageComponent } from './admin/role-manage/role-manage.component';
import { HomeComponent } from './admin/home/home.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { HomepageComponent } from './reports/homepage/homepage.component';
import { AdminReportComponent } from './reports/admin-report/admin-report.component';
import { OperationReportComponent } from './reports/operation-report/operation-report.component';
import { ComplianceReportComponent } from './reports/compliance-report/compliance-report.component';
import { NsCaseListingComponent } from './ns-case-listing/ns-case-listing.component';
import { UsergroupComponent } from './admin/usergroup/usergroup.component';
import { PaymentScreeningForEPHComponent } from './payment-screening-for-eph/payment-screening-for-eph.component';
const routes: Routes = [
     
      {path: 'internamanagement', component: InterlistManagementComponent,canActivate : [ActivateGuard] },
      {path: 'internaldeflist', component: InternallistDefinationComponent,canActivate : [ActivateGuard] },
      {path: 'internalwatchlist', component: InternallistWatchlistComponent,canActivate : [ActivateGuard] },
      {path: 'blacklistedbic', component: BlacklistBicComponent,canActivate : [ActivateGuard] },
      {path: 'highriskcountries', component: HighRiskCountriesComponent,canActivate : [ActivateGuard] },
      {path: 'neutralwords', component: NeutralWordsComponent,canActivate : [ActivateGuard]  },
      {path: 'sanctionedcities', component: SanctionedCitiesComponent,canActivate : [ActivateGuard] },
      {path: 'zonevsglobal', component: ZoneVsGlobalComponent,canActivate : [ActivateGuard] },
      {path: 'register', component: RegisterComponent },
      {path: 'login', component: LoginComponent,canActivate: [ActivateGuard]},
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
      {path: 'home', component: DashboardComponent, canDeactivate: [DeactivateGuard] },
      {path: 'match-score-threshold', component:MatchScoreComponent,canActivate : [ActivateGuard]},
      {path: 'name-screen', component:NameScreeningFieldsComponent,canActivate : [ActivateGuard]},
      {path: 'sensitive-word', component:SensitiveWordComponent,canActivate : [ActivateGuard]},
      {path: 'politicaly-Exposed-Person', component:PepComponent,canActivate : [ActivateGuard]},
      {path: 'payment-screen-adk', component:PaymentScreeningForAdkComponent,canActivate : [ActivateGuard]},
      {path: 'payment-screen-eph', component:PaymentScreeningForEPHComponent,canActivate : [ActivateGuard]},
      {path: 'add-zone', component:AddzoneComponent},
      {path: 'case-listing', component:CaseListingComponent},
      {path: 'department', component:DepartmentComponent},
      {path: 'paysys', component:PaysysComponent},
      {path: 'users', component:UsersListComponent},
      {path: 'roles_manage', component:RoleManageComponent},
      {path: 'superAdmin', component:HomeComponent, canDeactivate: [DeactivateGuard]},
      {path: 'customer-basic-number', component:CaseDetailComponent,canActivate : [ActivateGuard]},
      {path: 'NS_Case_Decision', component:NsCaseListingComponent,canActivate : [ActivateGuard]},
      {path: 'user-group', component:UsergroupComponent},
      {
        path: 'report',            //<---- parent component declared here
        component: HomepageComponent,
        children: [                          //<---- child components declared here
            {
                path:'admin-report',
                component: AdminReportComponent
            },
            {
                path:'operation-report',
                component: OperationReportComponent
            },
            {
                path:'compliance-report',
                component: ComplianceReportComponent
            },
          
        ]
    },
      {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
