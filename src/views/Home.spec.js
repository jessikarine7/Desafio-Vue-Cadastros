import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Home from './Home.vue';

describe('Home', () => {
  it('deve montar o component sem erros', () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain('Lista de Opções');
  });
  it('deve ter mais de 3 colunas', () => {
    const wrapper = mount(Home);
    expect(wrapper.findAll('[data-testid="column"]').length).greaterThan(3);
  });
});
