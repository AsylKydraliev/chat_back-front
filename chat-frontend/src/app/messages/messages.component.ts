import { Component, OnInit } from '@angular/core';
import { Message } from '../shared/message.model';
import { Subscription } from 'rxjs';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {
  messages!: Message[];
  date: string[] = [];
  loading = false;
  messagesSubscription!: Subscription;
  loadingSubscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(){
    this.messagesSubscription = this.messageService.messagesChange.subscribe((messages: Message[]) => {
      this.messages = messages;
    })
    this.loadingSubscription = this.messageService.loadingChange.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    })
    this.messageService.getAllMessages();
  }

  ngOnDestroy(){
    this.messagesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.messageService.stop();
  }
}
