import { Component, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pwa-todo';
  promptEvent: any;
  showInstallation: boolean;
  viewportMobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({ length: 5 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  // tslint:disable-next-line: variable-name
  private _viewportQueryListener: () => void;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.promptEvent = e;
    this.showInstallation = true;
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.viewportMobileQuery.addListener(this._viewportQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.viewportMobileQuery.removeListener(this._viewportQueryListener);
  }

  addToHomeScreen() {
    this.showInstallation = false;
    this.promptEvent.prompt();
    this.promptEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.promptEvent = null;
      });
  }
}
