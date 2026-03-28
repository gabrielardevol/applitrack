import { signal, WritableSignal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

export class BaseService<TSingle, TList extends { id: null | string }, TCreate extends { id: null | string }, TUpdate> {

  public $listValue: WritableSignal<TList[]> = signal<TList[]>([]);

  constructor(private readonly STORAGE_KEY: string, private readonly API: string) {
    this.getList()

  }

  public create(item: TCreate): TList {
    item.id = uuidv4()
    this.createLocal(item);
    this.$listValue.set([...this.$listValue(), item as unknown as TList])
    return {} as TList
  }

  public getList(): TList[] {
    let list = window.localStorage.getItem(this.STORAGE_KEY) || '[]'
    this.$listValue.set(JSON.parse(list) as TList[])
    return []
  }

  public getSingle(id: string): TSingle {
    return {} as TSingle
  }

  public delete(id: string): { success: boolean } {
    let filteredList = this.$listValue().filter(item => item.id != id);
    this.$listValue.set(filteredList);
    this.deleteLocal()
    //delete from localstore
    //delete from api
    return { success: true }
  }

  public update(offer: TUpdate): TList {
    return {} as TList
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

  private getSingleLocal(): TSingle {
    return {} as TSingle
  }

  private getSingleApi(): TSingle {
    return {} as TSingle
  }

  private createLocal(item: TCreate): TCreate {
    let items = window.localStorage.getItem(this.STORAGE_KEY) || "[]";
    let parsedItems = JSON.parse(items)
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...parsedItems, item]))
    return item
  }

  private createApi(): TList {
    return {} as TList
  }

  private deleteLocal(): { success: boolean } {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...this.$listValue()]))
    return { success: true }
  }

  private deleteApi(): { success: boolean } {
    return { success: true }
  }

  private updateLocal(offer: TUpdate): TList {
    return {} as TList
  }

  private updateApi(offer: TUpdate): TList {
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
