
export const getChar = (i) => String.fromCharCode(i + 97); 

export const ranks = new Array(8).fill().map((val , index) => 8 - index);

export const files = new Array(8).fill().map((val , index) => getChar(index));

