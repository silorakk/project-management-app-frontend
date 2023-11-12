import { FilterTasksByStatusPipe } from './filter-tasks-by-status.pipe';

describe('FilterTasksByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTasksByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
