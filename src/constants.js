const NORMALIZED_NONE = 'None';

const NORMALIZATION = {
  '[': [1, 0, 0, 0, 0, 0, 0],
  ']': [0, 1, 0, 0, 0, 0, 0],
  'F': [0, 0, 1, 0, 0, 0, 0],
  'X': [0, 0, 0, 1, 0, 0, 0],
  'L': [0, 0, 0, 0, 1, 0, 0],
  '+': [0, 0, 0, 0, 0, 1, 0],
  '-': [0, 0, 0, 0, 0, 0, 1],
};

const NORMALIZATION_MAP = {
  [NORMALIZED_NONE]: [0, 0, 0, 0, 0, 0, 0],
  ...NORMALIZATION,
}

const PROGRAM_DELIMITER = '';

export {
  NORMALIZED_NONE,
  NORMALIZATION_MAP,
  PROGRAM_DELIMITER,
};
