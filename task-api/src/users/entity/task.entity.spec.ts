import { Tasks } from './task.entity';

describe('TaskEntity', () => {
  it('should be defined', () => {
    expect(new Tasks()).toBeDefined();
  });
});
