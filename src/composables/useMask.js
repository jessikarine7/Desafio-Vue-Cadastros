import { Mask } from 'maska'

export const useMask = () => {
  const optionsCpf = { mask: '###.###.###-##' }
  const optionsTelefone = { mask: '(##) #####-####' }

  const cpf = new Mask(optionsCpf);
  const telefone = new Mask(optionsTelefone);

  const masks = {
    cpf,
    telefone
  }

  return {
    unmask: (field, value) => {
      return masks[field].unmasked(value);
    },
    addMask: (field, value) => {
      return masks[field].masked(value);
    },
    optionsCpf,
    optionsTelefone,
  }
}
