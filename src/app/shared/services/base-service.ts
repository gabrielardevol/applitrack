import { signal, WritableSignal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

export class BaseService<
  TSingle extends { id: string },
  TList extends { id: string },
  TCreate,
> {

  public $listValue: WritableSignal<TList[]> = signal<TList[]>([]);

  constructor(private readonly STORAGE_KEY: string, private readonly API: string) {
    this.getList()

  }

  public create(item: TCreate): TSingle | null {
    let createdItem = this.createLocal({ ...item, id: uuidv4(), createdAt: new Date() });
    if (createdItem) {
      this.$listValue.set([...this.$listValue(), item as unknown as TList])
      return createdItem;
    } else {
      console.error('Response could not be created')
      return null;
    }
  }

  private createLocal(item: TCreate & { id: string }): TSingle | null {
    let items = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
    let parsedItems = JSON.parse(items);
    try {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...parsedItems, item]));
      return this.getSingle(item.id!);
    } catch {
      console.error('Error saving new item to localstorage');
      return null;
    }
  }

  public getList(): TList[] {
    let list = window.localStorage.getItem(this.STORAGE_KEY) || '[]';
    let parsedList = JSON.parse(list) as TList[];
    this.$listValue.set(parsedList);
    return parsedList;

  }

  public getSingle(id: string): TSingle | null {
    return this.getSingleLocal(id)
  }

  public delete(id: string) {
    let filteredList = this.$listValue().filter(item => item.id != id);
    this.$listValue.set(filteredList);
    this.deleteLocal();

  }

  private getSingleLocal(id: string): TSingle | null {
    try {
      let list = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
      let parsedList = JSON.parse(list);
      let selectedItem = (parsedList as TSingle[]).filter(item => item.id = id)[0] || null
      return selectedItem
    } catch {
      console.error('Error retrieving item from localstorage');
      return null
    }
  }

  private deleteLocal(): true | null {
    try {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...this.$listValue()]))
      return true
    } catch {
      console.error("Error deleting item from local storage")
      return null
    }
  }

  public update(offer: Partial<TSingle>, id: string): TSingle | null {
    return this.updateLocal(offer, id);
  }

  private updateLocal(offer: Partial<TSingle>, id: string): TSingle | null {
    try {
      let list = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
      let parsedList = JSON.parse(list);
      let newList = (parsedList as TSingle[]).map(i => i.id == id ? { ...i, ...offer } : i)
      let item = newList.filter(i => i.id === id)[0]
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newList))
      return item
    } catch {
      console.error('Error updating item on localstorage');
      return null
    }
  }

  public addComment(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public updateComment(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public deleteComment(id: string): { success: boolean } {
    return { success: true }
  }

  private getListLocal(): TList[] {
    return []
  }

  private getListApi(): TList[] {
    return []
  }


  private getSingleApi(): TSingle {
    return {} as TSingle
  }


  private createApi(): TList {
    return {} as TList
  }


  private deleteApi(): { success: boolean } {
    return { success: true }
  }



  private updateApi(offer: TSingle): TList {
    return {} as TList
  }

  private addCommentLocal(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  private addCommentApi(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  private updateCommentLocal(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  private updateCommentApi(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  private deleteCommentLocal(id: string): { success: boolean } {
    return { success: true }
  }

  private deleteCommentApi(id: string): { success: boolean } {
    return { success: true }
  }

  private apiPersist(): { success: boolean } {
    return { success: true }
  }
}
