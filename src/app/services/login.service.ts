import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map  } from 'rxjs/operators';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  nose;
  constructor(private afs: AngularFirestore) {

    this.itemsCollection = afs.collection<any>('items');
    this.items = this.itemsCollection.valueChanges();
    
    this.nose = afs.collection('items').doc('doc');
    console.log(this.nose.valueChanges().subscribe((d)=>{console.log(d)}));
    

    this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public retornaItems(){
    return this.items;
  }

  public alta(){
    this.itemsCollection.add({test:'alta'});
    
  }

  public modifica(asd){
    this.nose.update({asd:'modifico esto?'});
  }
}
