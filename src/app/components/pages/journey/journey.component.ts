import { Component, Input } from '@angular/core';

import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-journey-modal',
  templateUrl: './journey.component.html'
})
export class JourneyComponent {

  @Input() connectionItem;

  constructor(public activeModal: NgbActiveModal) {}

}
