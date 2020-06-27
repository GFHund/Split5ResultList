import { Directive, ViewContainerRef, TemplateRef, Input, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnInit, AfterViewChecked {



  constructor(
    private auth: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
    }

    ngOnInit(): void {

    }

    ngAfterViewChecked(): void {
      if (this.auth.isLoggedIn()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
}
