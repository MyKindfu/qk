import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SingleSpaProps,
  singleSpaPropsSubject,
} from 'src/single-spa/single-spa-props';

@Component({
  selector: 'iview-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  singleSpaProps: SingleSpaProps | undefined;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe((props) => {
      this.singleSpaProps = props;
      console.log(props);
    });
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  // OR if you don't need to access `singleSpaProps` inside the component
  // then create `Observable` property and use it in template with `async` pipe.
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
}
