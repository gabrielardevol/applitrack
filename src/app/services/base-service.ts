import { signal, WritableSignal } from "@angular/core";
import { parse, v4 as uuidv4 } from 'uuid';

export class BaseService<
  TSingle extends { id: string },
  TList extends { id: string },
  TCreate extends { id: null | string },
> {

  public $listValue: WritableSignal<TList[]> = signal<TList[]>([]);

  constructor(private readonly STORAGE_KEY: string, private readonly API: string) {
    this.getList()

  }

  public create(item: TCreate) {
    item.id = uuidv4()
    let creation = this.createLocal(item);
    if (creation.success) {
      this.$listValue.set([...this.$listValue(), item as unknown as TList])
    }
  }

  private createLocal(item: TCreate): { success: boolean; item?: TCreate } {
    let items = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
    let parsedItems = JSON.parse(items)
    try {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...parsedItems, item]))
      return { success: true, item: item }
    } catch {
      console.error('Error saving new item to localstorage');
      return { success: false }
    }
  }

  public getList(): void {
    let list = window.localStorage.getItem(this.STORAGE_KEY) || '[]'
    this.$listValue.set(JSON.parse(list) as TList[])
  }

  public getSingle(id: string) {
    return this.getSingleLocal(id)
  }

  public delete(id: string): { success: boolean } {
    let filteredList = this.$listValue().filter(item => item.id != id);
    this.$listValue.set(filteredList);
    return { success: this.deleteLocal().success }
  }
  private getSingleLocal(id: string): { success: boolean, item?: TSingle } {
    try {
      let list = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
      let parsedList = JSON.parse(list);
      let selectedItem = (parsedList as TSingle[]).filter(item => item.id = id)[0] || null
      return { success: true, item: selectedItem }
    } catch {
      console.error('Error retrieving item from localstorage');
      return { success: false }
    }
  }

  private deleteLocal(): { success: boolean } {
    try {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...this.$listValue()]))
      return { success: true }
    } catch {
      console.error("Error deleting item from local storage")
      return { success: false }
    }
  }
  public update(offer: Partial<TSingle>, id: string): { success: boolean, item?: TSingle } {
    return this.updateLocal(offer, id);
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

  private updateLocal(offer: Partial<TSingle>, id: string): { success: boolean, item?: TSingle } {
    try {
      let list = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
      let parsedList = JSON.parse(list);
      let newList = (parsedList as TSingle[]).map(i => i.id == id ? { ...i, ...offer } : i)
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newList))
      return { success: true }
    } catch {
      console.error('Error updating item on localstorage');
      return { success: false }
    }
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
