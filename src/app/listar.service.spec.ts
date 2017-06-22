import { TestBed, inject } from '@angular/core/testing';

import { ListarService } from './listar.service';

describe('ListarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarService]
    });
  });

  it('should be created', inject([ListarService], (service: ListarService) => {
    expect(service).toBeTruthy();
  }));
});
