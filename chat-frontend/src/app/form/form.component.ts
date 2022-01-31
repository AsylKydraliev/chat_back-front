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

  setFormValue(value: {[key: string]: string}) {
    setTimeout(() => {
      this.postForm.form.setValue(value);
    })
  }

  onSend() {
    const body = {
      message: this.postForm.value.message,
      author: this.postForm.value.author
    }

    this.messageService.postMessage(body);

    this.setFormValue({
      author: '',
      message: '',
    })
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
