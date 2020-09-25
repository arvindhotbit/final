import { CanDeactivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export class DeactivateGuard implements CanDeactivate<DashboardComponent> {

  canDeactivate(component: DashboardComponent) {
    return component.canDeactivate();
  }
}