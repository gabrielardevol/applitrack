import { TestBed } from '@angular/core/testing';

import { BaseService } from './base-service';

type TestingObj = {
  foo: string,
  id?: string
}

describe('BaseService', () => {
  let service: BaseService<{ foo: string, id: string }, any, any>;
  let createdObj: TestingObj;

  beforeEach(() => {
    service = new BaseService<any, any, any>('TESTING', '');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return created object', () => {
    createdObj = service.create({ foo: 'bar' })
    expect(createdObj).toEqual(createdObj);
  });

  it('should return created object with id', () => {
    expect(createdObj).toHaveProperty('id');
  });

  it('should update object', () => {
    createdObj.foo = 'foo';
    expect(service.update({ foo: 'foo' }, createdObj.id!)).toEqual(createdObj);
  });

  it('should delete object', () => {
    expect(service.delete(createdObj.id!)).toBeFalsy;
  });
});
