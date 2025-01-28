import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LightboxBoxContentComponent } from './lightbox-box-content/lightbox-box-content.component';
import { LightboxService } from './lightbox-box-content/lightbox-service/lightbox.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [IconComponent, CommonModule, LightboxBoxContentComponent],
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss', './animations.scss',]
})
export class LightboxComponent {
  constructor(public service: LightboxService) { }

}
