import { DisabledUsersPipe } from './disabled-users.pipe';

describe('DisabledUsersPipe', () => {
  it('create an instance', () => {
    const pipe = new DisabledUsersPipe();
    expect(pipe).toBeTruthy();
  });
});
