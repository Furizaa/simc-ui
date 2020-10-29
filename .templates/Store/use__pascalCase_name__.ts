import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

export type {{pascalCase name}} = {
  list: Record<string, any>;
};

const store = (set: SetState<{{pascalCase name}}>) => ({
  list: {},
});

export default create<{{pascalCase name}}>(devtools(store, '{{pascalCase name}}'));
