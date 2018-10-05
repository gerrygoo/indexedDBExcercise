import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // message service has to be public to bind it to template
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
