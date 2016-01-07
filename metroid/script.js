var drawDebug = false;

////////////////////////////////////////////////////////////////////////////////
// Level data
////////////////////////////////////////////////////////////////////////////////

var tileSize = 16;
var windowScale = 2;
var screenWidth = 16;
var screenHeight = 12;
var screenData = [
  [1,2,1,1],
  [5,2,1,1],
  [3,0,1,2],
  [6,1,1,1],
  [4,1,2,1],
  [1,1,2,1],
  [6,2,1,2],
  [5,3,1,1],
  [0,1,1,3],
  [1,3,1,1],
  [2,2,3,2]
];
var boxData = [
  [0,12,1,36,0],
  [1,12,13,1,0],
  [1,17,2,4,0],
  [1,29,2,4,0],
  [1,41,2,7,0],
  [3,20,7,1,0],
  [3,32,7,1,0],
  [3,44,18,4,0],
  [5,26,7,1,0],
  [5,38,7,1,0],
  [12,23,2,4,0],
  [12,35,2,4,0],
  [14,12,4,7,0],
  [14,23,4,8,0],
  [14,35,13,5,0],
  [18,12,28,1,0],
  [18,23,12,2,0],
  [18,29,6,2,0],
  [21,46,14,2,0],
  [24,29,3,1,0],
  [27,34,1,8,0],
  [28,33,6,9,0],
  [30,23,4,6,0],
  [34,23,44,2,0],
  [34,33,1,4,0],
  [35,47,4,1,0],
  [39,44,4,4,0],
  [43,47,28,1,0],
  [46,12,2,7,0],
  [48,0,1,19,0],
  [49,0,14,1,0],
  [49,8,1,11,0],
  [50,8,1,4,0],
  [50,16,1,2,0],
  [51,11,2,1,0],
  [51,17,2,1,0],
  [54,8,4,1,0],
  [54,14,4,1,0],
  [54,20,4,1,0],
  [59,11,2,1,0],
  [59,17,2,1,0],
  [61,8,1,4,0],
  [61,16,1,2,0],
  [62,8,1,11,0],
  [63,0,1,19,0],
  [64,12,2,7,0],
  [66,12,28,1,0],
  [71,44,2,4,0],
  [73,47,4,1,0],
  [77,33,1,4,0],
  [77,46,14,2,0],
  [78,23,4,6,0],
  [78,33,6,9,0],
  [82,23,12,2,0],
  [84,34,1,8,0],
  [85,29,3,1,0],
  [85,35,13,5,0],
  [88,29,6,2,0],
  [91,44,18,4,0],
  [94,12,4,4,0],
  [94,20,4,11,0],
  [98,12,13,1,0],
  [98,23,13,2,0],
  [98,35,2,4,0],
  [100,38,7,1,0],
  [102,32,7,1,0],
  [109,29,2,4,0],
  [109,41,2,7,0],
  [111,12,1,36,0],
  [6,23.0,6,3.0,4],
  [6,35.0,6,3.0,4],
  [8,13.0,6,3.0,2],
  [12,27.0,2,1.0,2],
  [12,39.0,2,1.0,2],
  [23,40.0,4,2.0,2],
  [42,13.0,4,2.0,2],
  [59,1.0,4,2.0,2],
  [75,46.0,2,1.0,4],
  [86,30.0,2,1.0,2],
  [87,44.0,4,2.0,4],
  [88,13.0,6,3.0,2],
  [88,20.0,6,3.0,4],
  [103,29.0,6,3.0,4],
  [103,41.0,6,3.0,4],
  [109,33.0,2,1.0,2],
  [100,35.0,6,3.0,3],
  [98,13.0,6,3.0,1],
  [98,20.0,6,3.0,3],
  [98,25.0,6,3.0,1],
  [98,39.0,2,1.0,1],
  [85,40.0,4,2.0,1],
  [49,1.0,4,2.0,1],
  [35,46.0,2,1.0,3],
  [24,30.0,2,1.0,1],
  [21,44.0,4,2.0,3],
  [18,13.0,4,2.0,1],
  [3,17.0,6,3.0,3],
  [3,29.0,6,3.0,3],
  [3,41.0,6,3.0,3],
  [1,21.0,2,1.0,1],
  [1,33.0,2,1.0,1]
];
var levelData = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,46,60,51,59,62,78,87,82,84,78,87,55,61,44,45,57,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,44,59,62,79,72,-1,-1,-1,-1,-1,-1,103,67,55,61,43,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,71,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,80,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,86,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,122,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,76,132,132,132,132,132,132,132,132,132,132,132,132,132,132,119,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,88,110,109,133,133,133,124,124,124,124,133,133,133,12,108,105,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,47,56,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,47,56,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,53,129,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,53,129,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,43,71,77,124,124,133,133,133,133,133,133,124,124,116,80,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [71,78,87,82,84,78,87,82,55,61,43,51,47,56,48,44,46,60,43,44,59,62,84,78,87,82,84,78,87,82,84,78,87,82,84,78,87,82,84,78,87,82,55,61,46,60,48,43,44,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,44,43,71,78,87,82,84,78,87,82,84,78,87,82,84,78,87,82,84,78,87,82,84,78,87,55,61,44,46,60,47,56,49,46,60,44,50,58,43,59,62,84,78,87,82,84,78,87,80],
  [76,-1,-1,-1,-1,-1,-1,-1,103,67,55,61,53,129,40,43,39,42,59,62,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,55,61,40,38,51,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,49,48,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,55,61,43,53,129,54,47,56,45,57,59,62,79,72,-1,-1,-1,-1,-1,-1,-1,119],
  [85,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,55,61,44,38,51,71,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,80,41,37,89,133,133,133,133,124,124,124,124,133,133,133,133,120,54,52,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,55,61,45,57,53,129,59,62,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,121],
  [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,80,41,37,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,44,40,86,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,122,43,51,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,84,78,87,82,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120],
  [86,-1,-1,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,51,40,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,51,38,88,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,12,105,48,49,86,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,122],
  [88,110,99,97,9,1,5,-1,-1,-1,-1,-1,-1,-1,120,43,44,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,43,41,71,77,124,124,133,133,133,133,133,133,124,124,116,80,52,54,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119],
  [47,56,43,63,64,97,9,1,5,-1,-1,-1,-1,-1,116,82,84,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,116,82,84,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,116,82,84,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119],
  [53,129,39,42,51,63,64,98,9,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,27,23,128,22,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121],
  [44,59,62,81,82,84,78,70,65,106,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,133,133,133,133,124,124,124,124,133,133,133,133,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,108,112,113,110,98,9,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,120],
  [71,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,92,74,46,60,44,51,66,68,98,9,1,5,-1,-1,-1,-1,-1,-1,-1,122],
  [76,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,92,74,47,56,50,58,47,56,43,44,66,68,98,9,-1,-1,-1,-1,-1,-1,-1,119],
  [85,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,99,112,113,110,99,108,112,113,110,99,99,108,112,113,110,99,112,113,110,99,99,108,112,113,99,108,112,113,110,99,99,108,112,113,110,99,99,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,111,108,112,113,110,111,111,108,112,113,110,111,111,108,112,113,110,111,111,108,112,113,110,111,92,74,44,43,53,129,51,43,53,129,50,58,45,57,66,68,108,112,113,110,108,112,113,105],
  [89,-1,-1,-1,-1,-1,2,6,4,8,90,73,44,43,46,60,37,71,84,78,87,82,84,78,87,82,84,78,87,82,80,38,51,76,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,30,36,31,35,119,48,51,71,84,78,87,82,84,78,87,82,84,78,87,82,80,44,49,43,47,56,46,60,59,62,84,78,87,82,84,78,87,80],
  [86,-1,-1,-1,-1,-1,4,8,90,73,45,57,39,42,47,56,40,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,41,44,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,52,43,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,49,54,44,53,129,59,62,79,72,-1,-1,-1,-1,-1,-1,-1,119],
  [76,-1,-1,-1,-1,11,91,75,87,82,84,83,55,61,53,129,44,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,43,37,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,44,49,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,54,45,57,59,62,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,121],
  [85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,80,51,38,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,51,40,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,43,54,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,43,44,71,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120],
  [89,-1,-1,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,37,41,86,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,116,82,84,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,116,82,84,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,122,48,51,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,-1,-1,122],
  [88,110,99,98,9,1,5,-1,-1,-1,-1,-1,-1,-1,120,40,43,88,112,113,110,99,108,112,101,100,106,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,11,104,107,113,110,111,108,112,113,105,52,43,89,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,111,108,105],
  [45,57,44,63,64,98,9,1,5,-1,-1,-1,-1,-1,116,82,84,78,87,82,84,78,87,82,79,72,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,103,67,84,78,87,82,84,78,87,82,84,77,-1,-1,-1,-1,-1,2,6,4,8,92,74,45,57,49],
  [46,60,43,39,42,63,64,98,9,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,4,8,92,74,50,58,51,43,54],
  [51,59,62,81,82,84,78,70,65,106,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,11,93,75,87,82,84,83,55,61,51],
  [71,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,12,110,108,109,14,115,114,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,14,115,114,12,110,108,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,80],
  [76,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,12,105,44,37,76,118,16,29,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,118,16,29,119,45,57,88,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,119],
  [85,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,99,112,113,110,99,99,108,112,113,110,99,99,108,112,113,105,51,43,40,85,123,17,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,123,17,33,121,44,50,58,88,112,113,110,111,111,108,112,113,110,111,111,108,112,113,111,98,9,1,5,-1,-1,-1,-1,-1,-1,-1,121],
  [89,-1,-1,-1,-1,-1,2,6,4,8,90,73,37,39,42,51,43,51,44,39,42,38,47,56,37,38,51,44,46,60,51,89,117,34,32,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,117,34,32,120,51,48,47,56,46,60,49,43,47,56,44,46,60,50,58,43,51,49,44,66,68,98,9,1,5,-1,-1,-1,-1,-1,120],
  [86,-1,-1,-1,-1,-1,4,8,90,73,44,51,40,43,45,57,47,56,37,38,51,41,53,129,40,41,47,56,45,57,43,88,110,109,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,12,108,105,49,52,53,129,50,58,54,44,53,129,43,51,48,43,44,46,60,54,50,58,51,66,68,98,9,-1,-1,-1,-1,-1,122],
  [76,-1,-1,-1,-1,11,91,75,87,82,84,83,55,61,46,60,53,129,40,41,44,43,46,60,39,42,53,129,51,44,39,42,38,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,119,48,43,54,51,49,44,43,48,43,51,46,60,50,58,52,46,60,51,43,59,62,81,82,84,78,70,69,106,-1,-1,-1,-1,119],
  [85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,103,67,84,78,87,84,78,87,84,78,87,55,61,46,60,37,43,38,47,56,41,85,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121,52,47,56,44,54,46,60,52,59,62,78,87,84,78,87,84,78,87,84,79,72,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,121],
  [89,-1,-1,1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,103,67,55,61,40,44,41,53,129,43,89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,120,51,53,129,50,58,43,59,62,79,72,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,6,-1,-1,120],
  [88,110,111,98,9,1,5,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,103,67,78,87,82,84,78,87,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,116,78,87,82,84,78,87,79,72,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,2,6,4,8,111,108,105],
  [46,60,44,66,68,98,9,1,5,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,24,19,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,2,6,4,8,92,74,43,47,56],
  [51,50,58,47,56,66,68,98,9,-1,-1,-1,-1,-1,27,23,128,22,-1,-1,-1,1,5,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,95,18,20,26,-1,-1,-1,-1,-1,-1,-1,2,6,-1,-1,-1,27,23,128,22,-1,-1,-1,-1,-1,4,8,92,74,48,44,49,53,129],
  [49,48,51,53,129,49,44,66,68,111,108,112,113,110,111,111,108,112,113,110,111,98,9,1,5,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,10,131,10,131,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,131,-1,-1,-1,-1,-1,96,21,127,94,-1,-1,-1,-1,-1,2,6,4,8,111,108,112,113,110,111,111,108,112,113,110,111,92,74,50,58,52,43,54,51,44],
  [54,52,43,46,60,54,51,43,50,58,43,49,47,56,45,57,44,46,60,51,48,66,68,98,9,-1,-1,-1,-1,-1,27,23,128,22,-1,1,5,-1,-1,3,130,3,130,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,130,-1,-1,2,6,-1,27,23,128,22,-1,-1,-1,-1,-1,4,8,92,74,44,47,56,51,43,50,58,44,46,60,48,43,46,60,49,47,56,46,60,50,58],
  [44,47,56,51,48,43,46,60,51,47,56,54,53,129,44,43,50,58,47,56,52,43,49,66,68,111,108,112,113,110,108,112,113,110,111,98,9,-1,-1,15,126,15,126,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,15,126,-1,-1,4,8,111,108,112,113,110,108,112,113,110,111,92,74,49,43,48,53,129,45,57,44,47,56,49,51,52,44,49,51,54,53,129,51,47,56,48],
  [43,53,129,44,52,44,50,58,44,53,129,51,50,58,46,60,51,43,53,129,50,58,54,51,50,58,46,60,44,43,50,58,46,60,51,66,68,110,111,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,108,112,113,110,111,108,92,74,43,44,51,50,58,46,60,43,44,50,58,51,54,44,52,43,46,60,51,43,53,129,54,43,50,58,54,44,43,46,60,44,53,129,52]
];

////////////////////////////////////////////////////////////////////////////////
// class Animation
////////////////////////////////////////////////////////////////////////////////

function Animation(image, width, height, frames, speed, loop) {
  this.image = image;
  this.width = width / tileSize;
  this.height = height / tileSize;
  this.frames = frames;
  this.speed = speed;
  this.loop = loop;
  this.next = null;
}

Animation.prototype.draw = function(c, x, y, frame) {
  var offset = this.frames[frame % this.frames.length];
  c.drawImage(this.image, offset.x, offset.y, this.width * tileSize, this.height * tileSize, Math.round(x * tileSize) / tileSize, Math.round(y * tileSize) / tileSize, this.width, this.height);
};

////////////////////////////////////////////////////////////////////////////////
// class Sprite
////////////////////////////////////////////////////////////////////////////////

function Sprite(anim) {
  this.x = 0;
  this.y = 0;
  this.anim = anim || null;
  this.frame = 0;
  this.countdown = 0;
  this.isDone = false;
}

Sprite.prototype.update = function() {
  if (++this.countdown >= this.anim.speed) {
    this.countdown = 0;
    if (++this.frame >= this.anim.frames.length) {
      this.frame = 0;
      if (this.anim.next) {
        this.anim = this.anim.next;
      } else if (!this.anim.loop) {
        this.frame = this.anim.frames.length - 1;
        this.isDone = true;
      }
    }
  }
};

Sprite.prototype.draw = function(c) {
  this.anim.draw(c, this.x, this.y, this.frame);
};

Sprite.prototype.setAnim = function(anim) {
  if (this.anim != anim) {
    this.anim = anim;
    this.frame = 0;
    this.countdown = 0;
    this.isDone = false;
  }
};

Sprite.prototype.centerOn = function(box) {
  this.x = box.x + (box.width - this.anim.width) / 2;
  this.y = box.y + (box.height - this.anim.height) / 2;
  return this;
};

function calcFrames(originX, originY, width, height, nx, n) {
  var frames = [];
  for (var y = 0, i = 0; i < n; y++) {
    for (var x = 0; x < nx && i < n; x++, i++) {
      frames.push({ x: originX + width * x, y: originY + height * y });
    }
  }
  return frames;
}

////////////////////////////////////////////////////////////////////////////////
// class World
////////////////////////////////////////////////////////////////////////////////

function World() {
  this.width = levelData[0].length;
  this.height = levelData.length;

  // Load the collision detection
  this.boxes = [];
  for (var i = 0; i < boxData.length; i++) {
    var d = boxData[i];
    this.boxes.push(new Box(d[0], d[1], d[2], d[3], d[4]));
  }

  // Load the visual
  var image = document.getElementById('tileset');
  this.visual = document.createElement('canvas');
  this.visual.width = this.width * tileSize;
  this.visual.height = this.height * tileSize;
  var c = this.visual.getContext('2d');
  var n = Math.floor(image.width / tileSize);
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      var tile = levelData[y][x];
      if (tile == -1) continue;
      var u = tile % n;
      var v = (tile - u) / n;
      c.drawImage(image, u * tileSize, v * tileSize, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

World.prototype.draw = function(c) {
  c.drawImage(this.visual, 0, 0, this.width, this.height);
};

World.prototype.moveBox = function(box, dx, dy, slide) {
  // Move along x axis
  if (dx) {
    for (var i = 0; i < this.boxes.length; i++) {
      var b = this.boxes[i];
      if (b.y + b.height > box.y && box.y + box.height > b.y) {
        // Special-case ramps
        var fromRight = (dx < 0 && box.x > b.x && box.x + dx < b.x + b.width);
        var fromLeft = (dx > 0 && box.x + box.width < b.x + b.width && box.x + box.width + dx > b.x);
        var aboveBottom = (box.y + box.height <= b.y + b.height);
        var belowTop = (box.y >= b.y);
        var skip = true;
        if (slide) {
          var tLeft = Math.max(0, Math.min(1, (box.x + dx - b.x) / b.width));
          var tRight = Math.max(0, Math.min(1, (box.x + box.width + dx - b.x) / b.width));
          if (b.type == TYPE_RAMP_BOTTOM_LEFT && fromRight && aboveBottom) box.y = Math.min(box.y, b.y + b.height * tLeft - box.height);
          else if (b.type == TYPE_RAMP_BOTTOM_RIGHT && fromLeft && aboveBottom) box.y = Math.min(box.y, b.y + b.height * (1 - tRight) - box.height);
          else if (b.type == TYPE_RAMP_TOP_LEFT && fromRight && belowTop) box.y = Math.max(box.y, b.y + b.height * (1 - tLeft));
          else if (b.type == TYPE_RAMP_TOP_RIGHT && fromLeft && belowTop) box.y = Math.max(box.y, b.y + b.height * tRight);
          else skip = false;
        } else {
          var tTop = Math.max(0, Math.min(1, (box.y + dy - b.y) / b.height));
          var tBottom = Math.max(0, Math.min(1, (box.y + box.height + dy - b.y) / b.height));
          if (b.type == TYPE_RAMP_BOTTOM_LEFT && fromRight && aboveBottom) dx = Math.max(dx, b.x + b.width * tBottom - box.x);
          else if (b.type == TYPE_RAMP_BOTTOM_RIGHT && fromLeft && aboveBottom) dx = Math.min(dx, b.x + b.width * (1 - tBottom) - box.x - box.width);
          else if (b.type == TYPE_RAMP_TOP_LEFT && fromRight && belowTop) dx = Math.max(dx, b.x + b.width * (1 - tTop) - box.x);
          else if (b.type == TYPE_RAMP_TOP_RIGHT && fromLeft && belowTop) dx = Math.min(dx, b.x + b.width * tTop - box.x - box.width);
          else skip = false;
        }
        if (skip) continue;

        // Adjust horizontal distance to avoid collisions
        if (dx < 0 && box.x >= b.x + b.width && box.x + dx < b.x + b.width) dx = b.x + b.width - box.x;
        else if (dx > 0 && box.x + box.width <= b.x && box.x + box.width + dx > b.x) dx = b.x - box.x - box.width;
      }
    }
    box.x += dx;
  }

  // Move along y axis
  if (dy) {
    var center = box.x + box.width / 2;
    for (var i = 0; i < this.boxes.length; i++) {
      var b = this.boxes[i];
      if (b.x + b.width > box.x && box.x + box.width > b.x) {
        var top = b.y, bottom = b.y + b.height;

        // Adjust top and bottom based on box type
        var tLeft = Math.max(0, Math.min(1, (box.x - b.x) / b.width));
        var tRight = Math.max(0, Math.min(1, (box.x + box.width - b.x) / b.width));
        if (b.type == TYPE_RAMP_BOTTOM_LEFT) top = b.y + b.height * tLeft;
        else if (b.type == TYPE_RAMP_BOTTOM_RIGHT) top = b.y + b.height * (1 - tRight);
        else if (b.type == TYPE_RAMP_TOP_LEFT) bottom = b.y + b.height * (1 - tLeft);
        else if (b.type == TYPE_RAMP_TOP_RIGHT) bottom = b.y + b.height * tRight;

        // Adjust vertical distance to avoid collisions
        if (dy < 0 && box.y >= bottom && box.y + dy < bottom) dy = bottom - box.y;
        else if (dy > 0 && box.y + box.height <= top && box.y + box.height + dy > top) dy = top - box.y - box.height;
      }
    }
    box.y += dy;
  }
};

////////////////////////////////////////////////////////////////////////////////
// class Box
////////////////////////////////////////////////////////////////////////////////

var TYPE_SOLID = 0;
var TYPE_RAMP_TOP_LEFT = 1;
var TYPE_RAMP_TOP_RIGHT = 2;
var TYPE_RAMP_BOTTOM_LEFT = 3;
var TYPE_RAMP_BOTTOM_RIGHT = 4;

function Box(x, y, width, height, type) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.type = type;
}

Box.prototype.center = function() {
  return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
};

Box.prototype.overlaps = function(other) {
  return other.x < this.x + this.width && other.x + other.width > this.x && other.y < this.y + this.height && other.y + other.height > this.y;
};

Box.prototype.draw = function(c) {
  var d = 0.5 / tileSize;
  c.strokeStyle = 'red';
  c.beginPath();
  if (this.type != TYPE_RAMP_BOTTOM_RIGHT) c.lineTo(this.x + d, this.y + d);
  if (this.type != TYPE_RAMP_BOTTOM_LEFT) c.lineTo(this.x + this.width + d, this.y + d);
  if (this.type != TYPE_RAMP_TOP_LEFT) c.lineTo(this.x + this.width + d, this.y + this.height + d);
  if (this.type != TYPE_RAMP_TOP_RIGHT) c.lineTo(this.x + d, this.y + this.height + d);
  c.closePath();
  c.stroke();
};

////////////////////////////////////////////////////////////////////////////////
// class Player
////////////////////////////////////////////////////////////////////////////////

var GRAVITY = 0.025 / 2;
Player.SPEED = 0.35 / 2;
Player.JUMP_SPEED = Player.SPEED * 2;

function Player() {
  this.sprite = new Sprite(anims.player.standL);
  this.box = new Box(0, 0, 1, 2);
  this.keys = { left: false, right: false, up: false, down: false, fire: false };
  this.v = { x: 0, y: 0 };
  this.facingLeft = false;
  this.onFloor = false;
  this.jumped = false;
  this.fireDelay = 0;
  this.fired = false;
}

Player.prototype.update = function() {
  // Update the velocity and position
  var oldOnFloor = this.onFloor, oldVX = this.v.x;
  this.v.x = Player.SPEED * (this.keys.right - this.keys.left);
  if (this.onFloor && this.keys.up && !this.jumped) {
    this.v.y = -Player.JUMP_SPEED;
    this.jumped = true;
  }
  else if (!this.keys.up) this.jumped = false;
  this.v.y += GRAVITY;
  var expectedY = this.box.y + this.v.y;
  game.world.moveBox(this.box, this.v.x, this.v.y, true);
  this.onFloor = (this.box.y < expectedY);
  if (this.onFloor) this.v.y = Math.min(this.v.y, Player.SPEED / 2);
  else if (this.box.y > expectedY) this.v.y = Math.max(this.v.y, 0);

  // Update the sprite
  this.facingLeft = this.v.x ? this.v.x < 0 : this.facingLeft;
  var suffix = this.facingLeft ? 'L' : 'R';
  if (!this.onFloor) {
    this.sprite.setAnim(anims.player['jump' + suffix]);
  } else if (this.v.x) {
    this.sprite.setAnim(anims.player['run' + suffix]);
  } else if (!oldOnFloor) {
    this.sprite.setAnim(anims.player['land' + suffix]);
  } else if (this.onFloor && oldVX && !this.v.x) {
    this.sprite.setAnim(anims.player['stand' + suffix]);
  }
  this.sprite.x = this.box.x - 1;
  this.sprite.y = this.box.y + this.box.height - this.sprite.anim.height;
  this.sprite.update();

  // Fire shots
  this.fireDelay -= 1;
  if (this.keys.fire) {
    if (!this.fired && this.fireDelay < 0) {
      sounds.pew.play();
      game.entities.push(new Missile(this.box.x + this.box.width / 2, this.box.y + 0.65, Missile.SPEED * (1 - 2 * this.facingLeft), 0));
      this.fireDelay = 20;
      this.fired = true;
    }
  } else {
    this.fired = false;
  }
};

Player.prototype.draw = function(c) {
  this.sprite.draw(c);
};

////////////////////////////////////////////////////////////////////////////////
// class Missile
////////////////////////////////////////////////////////////////////////////////

Missile.SPEED = 0.4;

function Missile(x, y, vx, vy) {
  x += vx < 0 ? -0.3 : 0.3;
  this.v = { x: vx, y: vy };
  this.box = new Box(x - 0.2, y - 0.2, 0.4, 0.4);
  this.sprite = new Sprite(vx < 0 ? anims.missiles.left : anims.missiles.right);
  this.puffDelay = 2 + Math.floor(Math.random() * 6);
}

Missile.prototype.update = function() {
  // Update the position
  var expectedX = this.box.x + this.v.x;
  game.world.moveBox(this.box, this.v.x, this.v.y, false);
  this.sprite.centerOn(this.box);
  this.sprite.update();

  // Expode if we hit a wall
  if (this.box.x != expectedX) {
    var i = game.entities.indexOf(this);
    if (i != -1) game.entities.splice(i, 1);
    game.particles.push(new Sprite(anims.missiles.boom).centerOn(this.box));
    sounds.boom.play();
  }

  // Add puff particles behind the missile
  if (--this.puffDelay < 0) {
    this.puffDelay = 2 + Math.floor(Math.random() * 6);
    game.particles.push(new Sprite(anims.missiles.puff).centerOn(this.box));
  }

  // Explode and remove entities when we intersect them
  for (var i = 0; i < game.entities.length; i++) {
    var entity = game.entities[i];
    if (entity instanceof Hopper && this.box.overlaps(entity.box)) {
      game.particles.push(new Sprite(anims.missiles.boom).centerOn(this.box));
      game.entities.splice(game.entities.indexOf(this), 1);
      game.entities.splice(i, 1);
      sounds.boom.play();
      break;
    }
  }
};

Missile.prototype.draw = function(c) {
  this.sprite.draw(c);
};

////////////////////////////////////////////////////////////////////////////////
// class Hopper
////////////////////////////////////////////////////////////////////////////////

function Hopper(x, y) {
  this.sprite = new Sprite(anims.enemies.hopper.down);
  this.box = new Box(x - 1, y - 0.75, 2, 1.5);
  this.v = { x: 0, y: 0 };
  this.waitOnFloor = 0;
  this.onFloor = false;
}

Hopper.prototype.update = function() {
  // Hop around randomly
  this.v.y += GRAVITY;
  var expectedY = this.box.y + this.v.y;
  game.world.moveBox(this.box, this.v.x, this.v.y, true);
  this.onFloor = (this.box.y < expectedY);
  if (this.onFloor) {
    this.v.y = Math.min(this.v.y, 0);
    if (this.v.y == 0) {
      this.sprite.setAnim(anims.enemies.hopper.down);
      this.v.x = 0;
    }
    if (this.waitOnFloor == 0) {
      this.waitOnFloor = 50 + Math.floor(50 * Math.random());
    } else if (--this.waitOnFloor == 0) {
      this.v.x = Math.random() < 0.5 ? -0.1 : 0.1;
      this.v.y = -0.25;
      this.sprite.setAnim(anims.enemies.hopper.up);
    }
  } else {
    if (this.box.y > expectedY) this.v.y = 0;
    this.waitOnFloor = 0;
  }

  // Update the sprite
  this.sprite.x = this.box.x + (this.box.width - this.sprite.anim.width) / 2;
  this.sprite.y = this.box.y + this.box.height - this.sprite.anim.height;
  this.sprite.update();
};

Hopper.prototype.draw = function(c) {
  this.sprite.draw(c);
};

////////////////////////////////////////////////////////////////////////////////
// class Sound
////////////////////////////////////////////////////////////////////////////////

function Sound(path, copies) {
  this.elems = [];
  this.index = 0;
  for (var i = 0; i < copies; i++) {
    this.elems.push(new Audio(path));
  }
}

Sound.prototype.play = function() {
  if (window.chrome) this.elems[this.index].load();
  this.elems[this.index].play();
  this.index = (this.index + 1) % this.elems.length;
};

////////////////////////////////////////////////////////////////////////////////
// Singleton anim
////////////////////////////////////////////////////////////////////////////////

// Common storage for all animations used in the game
var anims = {
  setup: function() {
    var player = document.getElementById('samus');
    this.player = {
      runL: new Animation(player, 50, 50, calcFrames(150, 450, -50, 50, 4, 10), 3, true),
      runR: new Animation(player, 50, 50, calcFrames(200, 450, 50, 50, 4, 10), 3, true),
      standL: new Animation(player, 50, 50, calcFrames(0, 100, 50, 50, 1, 1), 3, false),
      standR: new Animation(player, 50, 50, calcFrames(350, 100, 50, 50, 1, 1), 3, false),
      jumpL: new Animation(player, 50, 50, calcFrames(550, 50, -50, 50, 4, 4), 3, false),
      jumpR: new Animation(player, 50, 50, calcFrames(600, 50, 50, 50, 4, 4), 3, false),
      landL: new Animation(player, 50, 50, calcFrames(550, 100, -50, 50, 4, 4), 3, false),
      landR: new Animation(player, 50, 50, calcFrames(600, 100, 50, 50, 4, 4), 3, false)
    };
    this.player.landL.next = this.player.standL;
    this.player.landR.next = this.player.standR;

    var missiles = document.getElementById('missiles');
    this.missiles = {
      left: new Animation(missiles, 25, 9, calcFrames(136, 75, 25, 9, 2, 2), 6, true),
      right: new Animation(missiles, 25, 9, calcFrames(136, 84, 25, 9, 2, 2), 6, true),
      puff: new Animation(missiles, 10, 10, calcFrames(122, 140, 10, 10, 9, 9), 3, false),
      boom: new Animation(missiles, 32, 32, calcFrames(75, 168, 32, 32, 5, 5), 3, false)
    };

    var enemies = document.getElementById('enemies');
    this.enemies = {
      hopper: {
        up: new Animation(enemies, 37, 35, calcFrames(234, 855, 37, 35, 3, 3), 6, false),
        down: new Animation(enemies, 37, 35, calcFrames(308, 855, -37, 35, 3, 3), 6, false)
      }
    };
  }
};

// Common storage for all sounds used in the game
var sounds = {
  boom: new Sound('boom.wav', 3),
  pew: new Sound('pew.wav', 3)
};

////////////////////////////////////////////////////////////////////////////////
// Singleton game
////////////////////////////////////////////////////////////////////////////////

// Holds the game itself
var game = {
  setup: function() {
    anims.setup();
    this.world = new World();
    this.player = new Player();
    this.player.box.x = 107.5;
    this.player.box.y = 21;
    this.entities = [this.player];
    this.particles = [];
    this.bg = document.getElementById('bg');

    // Expand screen regions by the screen size
    for (var i = 0; i < screenData.length; i++) {
      var screen = screenData[i];
      screen[0] *= screenWidth;
      screen[1] *= screenHeight;
      screen[2] *= screenWidth;
      screen[3] *= screenHeight;
    }

    // Add a few enemies to start off
    this.entities.push(new Hopper(69, 22));
    this.entities.push(new Hopper(75, 22));
    this.entities.push(new Hopper(81, 22));
  },

  update: function() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].isDone) this.particles.splice(i--, 1);
    }
  },

  draw: function(c) {
    var w = c.canvas.width / 2 / tileSize;
    var h = c.canvas.height / 2 / tileSize;
    var center = this.player.box.center();

    // Find all screens overlapping with the player
    var screens = [], box = this.player.box;
    box = new Box(box.x - 1, box.y, box.width + 2, box.height);
    for (var i = 0; i < screenData.length; i++) {
      var screen = screenData[i];
      if (screen[0] + screen[2] > box.x && screen[0] < box.x + box.width && screen[1] + screen[3] > box.y && screen[1] < box.y + box.height) {
        screens.push(screen);
      }
    }

    // Constrain the camera center to a weighted average of the center constrained in each screen
    if (screens.length) {
      var cx = 0, cy = 0;
      for (var i = 0; i < screens.length; i++) {
        var screen = screens[i];
        var percent = (Math.min(screen[0] + screen[2], box.x + box.width) - Math.max(screen[0], box.x)) * (
          Math.min(screen[1] + screen[3], box.y + box.height) - Math.max(screen[1], box.y)) / (box.width * box.height);
        cx += Math.max(screen[0] + w, Math.min(center.x, screen[0] + screen[2] - w)) * percent;
        cy += Math.max(screen[1] + h, Math.min(center.y, screen[1] + screen[3] - h)) * percent;
      }
      center.x = cx;
      center.y = cy;
    }

    // Clear the screen and set up the camera
    c.save();
    c.translate(c.canvas.width / 2, c.canvas.height / 2);
    c.lineWidth = 1 / tileSize;
    c.scale(tileSize, tileSize);
    c.translate(-Math.round(center.x * tileSize) / tileSize, -Math.round(center.y * tileSize) / tileSize);

    // Draw a tiled background
    var bgW = this.bg.width / tileSize, bgH = this.bg.height / tileSize;
    var parallaxX = center.x / 2, parallaxY = center.y / 2;
    var xmin = parallaxX + Math.floor((center.x - parallaxX - w) / bgW) * bgW;
    var ymin = parallaxY + Math.floor((center.y - parallaxY - h) / bgH) * bgH;
    var xmax = parallaxX + Math.floor((center.x - parallaxX + w) / bgW) * bgW;
    var ymax = parallaxY + Math.floor((center.y - parallaxY + h) / bgH) * bgH;
    for (var x = xmin; x < xmax + 0.001; x += bgW) {
      for (var y = ymin; y < ymax + 0.001; y += bgH) {
        c.drawImage(this.bg, x, y, bgW, bgH);
      }
    }

    // Draw sprites
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].draw(c);
    }
    this.world.draw(c);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(c);
    }

    // Debug drawing
    if (drawDebug) {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].box.draw(c);
      }
      for (var i = 0; i < this.world.boxes.length; i++) {
        this.world.boxes[i].draw(c);
      }
    }
    c.restore();
  }
};

////////////////////////////////////////////////////////////////////////////////
// Event loop
////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  var c = document.getElementById('screen').getContext('2d');
  c.canvas.width = screenWidth * tileSize;
  c.canvas.height = screenHeight * tileSize;
  c.canvas.style.width = c.canvas.width * windowScale + 'px';
  c.canvas.style.height = c.canvas.height * windowScale + 'px';
  game.setup();
  setInterval(function() {
    game.update();
    game.draw(c);
  }, 1000 / 60);
};

function actionForEvent(e) {
  var key = e.which;
  if (key == 32) return 'fire';
  if (key == 37) return 'left';
  if (key == 38) return 'up';
  if (key == 39) return 'right';
  if (key == 40) return 'down';
  return null;
}

window.onkeydown = function(e) {
  var action = actionForEvent(e);
  if (action == 'left') game.player.keys.left = true;
  if (action == 'right') game.player.keys.right = true;
  if (action == 'up') game.player.keys.up = true;
  if (action == 'down') game.player.keys.down = true;
  if (action == 'fire') game.player.keys.fire = true;
};

window.onkeyup = function(e) {
  var action = actionForEvent(e);
  if (action == 'left') game.player.keys.left = false;
  if (action == 'right') game.player.keys.right = false;
  if (action == 'up') game.player.keys.up = false;
  if (action == 'down') game.player.keys.down = false;
  if (action == 'fire') game.player.keys.fire = false;
};
