import { Session } from './types';
import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/authentication.service';
import { ContractComponent } from './components/informational/contract/contract.component';
import { DataProtectionComponent } from './components/informational/data-protection/data-protection.component';
import { CardTypesComponent } from './components/helper-modules/constellation/card-types/card-types.component';
import { ConstellationSelectorComponent } from './components/helper-modules/constellation/constellation-selector/constellation-selector.component';
import { CardDeckComponent } from './components/helper-modules/constellation/card-deck/card-deck.component';
import { GenekeysPreselectorComponent } from './components/helper-modules/constellation/genekeys-preselector/genekeys-preselector.component';
import { RouteGuardService } from './services/auth-redirect-guard.service';
import { PublicRouteGuard } from './services/public-route.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/structural/main-layout/main-layout.component';
import { SessionWrapperComponent } from './components/helper-modules/session/session-wrapper/session-wrapper.component';

export const routes: Routes = [
  {
    path: 'session/:sessionId',
    component: SessionWrapperComponent,
    canActivate: [PublicRouteGuard], // Keep this route at the top to prevent home resolver from intercepting
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: {
          auth: () => {
            const auth = inject(AuthService);
            const router = inject(Router);
            const guard = new RouteGuardService(auth, router);
            return guard.redirectBasedOnAuth();
          },
        },
      },
      {
        path: 'contract',
        component: ContractComponent,
      },
      {
        path: 'dataprotection',
        component: DataProtectionComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'constellation',
        component: ConstellationSelectorComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'genekeys-preselector',
        component: GenekeysPreselectorComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'card-types',
        component: CardTypesComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'card-deck',
        component: CardDeckComponent,
        canActivate: [RouteGuardService],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
