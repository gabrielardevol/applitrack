import { signal, WritableSignal } from "@angular/core";

export class BaseService<TSingle, TList, TCreate, TUpdate> {
  constructor(STORAGE_KEY: string, API: string) {
  }

  public $listValue: WritableSignal<TList[]> = signal<TList[]>([]);

  public getList(): TList[] {
    return []
  }

  public getSingle(): TSingle {
    return {} as TSingle
  }

  public create(item: TCreate): TList {
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

  private createLocal(): TList {
    return {} as TList
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
