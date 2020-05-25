import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {

    this.itemsCollection = afs.collection<any>('items');
    this.items = this.itemsCollection.valueChanges();
    
  }

  public retornaItems(){
    return this.items;
  }
}
