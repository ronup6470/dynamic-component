import { Component, ChangeDetectionStrategy } from '@angular/core';
// ---------------------------------- //
import { DynamicPresenter } from '../dynamic-presenter/dynamic.presenter';


@Component({
  selector: 'app-dynamic-ui',
  templateUrl: './dynamic.presentation.html',
  styleUrls: ['./dynamic.presentation.scss'],
  viewProviders: [DynamicPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPresentationComponent  {
  constructor() {}
}