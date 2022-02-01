import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService{
  messages: Message[] | null = null;
  messagesChange = new Subject<Message[]>();
  loadingChange = new Subject<boolean>();
  postLoadingChange = new Subject<boolean>();
  interval!: number;

  constructor(private http: HttpClient) {}

  getAllMessages(){
    this.loadingChange.next(true);
    this.http.get<{[id: string]: Message}>('http://localhost:8000/messages').pipe(map(result => {
      if(result === null){
        return [];
      }
      return Object.keys(result).map(id => {
        const message = result[id];
        return new Message(message.id, message.message, message.author, message.datetime);
      })
    }))
      .subscribe(result => {
        this.messages = [];
        this.messages = result;
        this.loadingChange.next(false);
        this.messagesChange.next(this.messages);
        this.start(this.messages[this.messages.length - 1].datetime);
      });
  }

  postMessage(message: {}){
    this.postLoadingChange.next(true);
    this.http.post('http://localhost:8000/messages', message).subscribe(() => {
      this.getAllMessages();
      this.postLoadingChange.next(false);
    });
  }

  start(date: string){
      this.interval = setInterval(() => {
        this.http.get<{[id: string]: Message}>(`http://localhost:8000/messages?datetime=${date}`)
          .pipe(
            map(result => {
                return Object.keys(result).map(id => {
                  const message = result[id];
                  return new Message(message.id, message.message, message.author, message.datetime);
                })
              }
            ))
            .subscribe(messages => {
              if(messages.length !== 0) {
                if(this.messages) {
                  this.messages?.concat(messages);
                  this.messagesChange.next(this.messages?.slice());
                }
              }
            })
      }, 1000)
  }

  stop(){
    clearInterval(this.interval);
  }
}
