export function getPoints(letter) {
      if(['A', 'E', 'I', 'L', 'N', 'O', 'R', 'S', 'T', 'U'].indexOf(letter)!== -1) return 1;
      if(['D', 'G'].indexOf(letter)!== -1) return 2;
      if(['B', 'C', 'M', 'P'].indexOf(letter)!== -1) return 3;
      if(['F', 'H', 'V', 'W', 'Y'].indexOf(letter)!== -1) return 4;
      if(['J', 'X'].indexOf(letter)!== -1) return 8;
      if(['Q', 'Z'].indexOf(letter)!== -1) return 10;
      if(letter === 'K') return 5;
      if(letter === '*') return 0;
}
