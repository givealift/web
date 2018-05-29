import { Component } from '@angular/core';
import { MessagingService } from './_services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private messageService: MessagingService) { }
}
