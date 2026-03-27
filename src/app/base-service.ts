// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class BaseService<TRead, TCreate, TUpdate> {
  constructor(STORAGE_KEY: string, API: string) {
  }

  public getList(): TRead[] {
    return []
  }

  public getSingle(): TRead {
    return {} as TRead
  }

  public create(): TRead {
    return {} as TRead
  }

  public delete(): { success: boolean } {
    return { success: true }
  }

  public update(offer: TUpdate): TRead {
    return {} as TRead
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

  private getListLocal(): TRead[] {
    return []
  }

  private getListApi(): TRead[] {
    return []
  }

  private getSingleLocal(): TRead {
    return {} as TRead
  }

  private getSingleApi(): TRead {
    return {} as TRead
  }

  private createLocal(): TRead {
    return {} as TRead
  }

  private createApi(): TRead {
    return {} as TRead
  }

  public deleteLocal(): { success: boolean } {
    return { success: true }
  }

  public deleteApi(): { success: boolean } {
    return { success: true }
  }

  public updateLocal(offer: TUpdate): TRead {
    return {} as TRead
  }

  public updateApi(offer: TUpdate): TRead {
    return {} as TRead
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
