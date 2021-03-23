import jestExpect from 'expect';

describe('todos tests', () => {
  beforeAll(async () => {
    // check https://github.com/wix/AppleSimulatorUtils for available permissions
    await device.launchApp({ permissions: { location: 'inuse' } });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the list of todos for a friend', async () => {
    await waitFor(element(by.id('friend-list-title')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('friend-list-item')).atIndex(0).tap();
    await waitFor(element(by.id('friend-detail-name'))).toBeVisible();
    await expect(element(by.id('todo-list'))).toBeVisible();
  });

  it('should delete a todo', async () => {
    await waitFor(element(by.id('friend-list-title')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('friend-list-item')).atIndex(0).tap();

    await waitFor(element(by.id('friend-detail-name'))).toBeVisible();

    const todosCount = (await element(by.id('todo-list-item')).getAttributes())
      .elements.length;

    await element(by.id('todo-list-item')).atIndex(0).tap();
    await element(by.text('Delete')).tap();

    const todosCountAfterDelete = (
      await element(by.id('todo-list-item')).getAttributes()
    ).elements.length;

    jestExpect(todosCount).toBe(todosCountAfterDelete + 1);
  });

  it('should mark a todo as completed', async () => {
    await waitFor(element(by.id('friend-list-title')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('friend-list-item')).atIndex(0).tap();

    await waitFor(element(by.id('friend-detail-name'))).toBeVisible();

    const todosCount = (await element(by.id('todo-list-item')).getAttributes())
      .elements.length;

    await element(by.id('todo-list-item')).atIndex(0).tap();
    await element(by.text('Mark as done')).tap();

    const todosCountAfterDelete = (
      await element(by.id('todo-list-item')).getAttributes()
    ).elements.length;

    jestExpect(todosCount).toBe(todosCountAfterDelete + 1);
  });

  it('should create a new todo', async () => {
    await waitFor(element(by.id('friend-list-title')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('friend-list-item')).atIndex(0).tap();
    await waitFor(element(by.id('friend-detail-name'))).toBeVisible();
    await element(by.text('ADD TODO')).tap();
    await element(by.id('new-todo-text')).typeText('My new todo');
    await element(by.text('SAVE')).tap();
    await element(by.text('COOL')).tap();
    await element(by.id('todo-list')).scrollTo('bottom');
    await expect(element(by.text('My new todo'))).toBeVisible();
  });
});
