import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @ViewChild('form') postForm!: NgForm;
  postSubscription!: Subscription;
  loading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.postSubscription = this.messageService.postLoadingChange.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    })
  }

  onSend() {
    const body = this.postForm.value;
    this.messageService.postMessage(body);

    this.postForm.resetForm();
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
