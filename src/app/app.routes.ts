import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClassifierComponent } from './classifier/classifier.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

export const routes: Routes = [
    { path: "onboarding", loadComponent: () => OnboardingComponent },
    { path: "classifier", loadComponent: () => ClassifierComponent },
    { path: "about", loadComponent: () => AboutComponent },
    { path: "not-found", loadComponent: () => FourOhFourComponent },
    { path: "", redirectTo: "onboarding", pathMatch: 'full' },
    { path: "**", redirectTo: "not-found", pathMatch: 'full' }
];
