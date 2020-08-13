const ALIGNMENTS = ['LEFT', 'RIGHT'];
const [LEFT, RIGHT] = ALIGNMENTS;

const padSpace = function (str, align, length = 20) {
  if (!ALIGNMENTS.includes(align)) {
    throw new Error(`Invalid alignment value ${align}`);
  }

  if (align === LEFT) {
    return str.padEnd(length, ' ');
  } else if (align === RIGHT) {
    return str.padStart(length, ' ');
  }
};

module.exports = padSpace;
