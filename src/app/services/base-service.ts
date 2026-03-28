import { signal, WritableSignal } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

export class BaseService<TSingle, TList, TCreate extends { id: null | string }, TUpdate> {
  constructor(private readonly STORAGE_KEY: string, private readonly API: string) {
    let list = window.localStorage.getItem(STORAGE_KEY) || '[]'
    this.$listValue.set(JSON.parse(list) as TList[])
  }

  public $listValue: WritableSignal<TList[]> = signal<TList[]>([]);

  public getList(): TList[] {
    return []
  }

  public getSingle(): TSingle {
    return {} as TSingle
  }

  public create(item: TCreate): TList {
    item.id = uuidv4()
    this.createLocal(item);
    this.$listValue.set([...this.$listValue(), item as unknown as TList])
    return {} as TList
  }

  public delete(id: string): { success: boolean } {
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

  public deleteLocal(): { success: boolean } {
    return { success: true }
  }

  public deleteApi(): { success: boolean } {
    return { success: true }
  }

  public updateLocal(offer: TUpdate): TList {
    return {} as TList
  }

  public updateApi(offer: TUpdate): TList {
    return {} as TList
  }

  public addCommentLocal(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public addCommentApi(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public updateCommentLocal(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public updateCommentApi(id: string, comment: Comment): Comment {
    return {} as Comment
  }

  public deleteCommentLocal(id: string): { success: boolean } {
    return { success: true }
  }

  public deleteCommentApi(id: string): { success: boolean } {
    return { success: true }
  }

  public apiPersist(): { success: boolean } {
    return { success: true }
  }
}
