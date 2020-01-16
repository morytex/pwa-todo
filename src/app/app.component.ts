import { Component, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pwa-todo';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({ length: 3 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private customMobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, @Inject(PLATFORM_ID) platformId: string) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.customMobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.customMobileQueryListener);

    const svgUrl = 'assets/icons/menu-24px.svg';
    const domain = (isPlatformServer(platformId)) ? 'http://localhost:4200/' : '';
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl(domain + svgUrl));
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.customMobileQueryListener);
  }
}
