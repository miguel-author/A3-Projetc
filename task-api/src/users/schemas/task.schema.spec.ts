import { Tasks } from './task.schema';

describe('TaskEntity', () => {
  it('should be defined', () => {
    expect(new Tasks()).toBeDefined();
  });
});
