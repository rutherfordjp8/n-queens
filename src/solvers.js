/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var row = [];
  var column = 0;

  for ( var i = 0; i !== n; i++ ) {
    row.push( 0 );
  }

  for ( var i = 0; i !== n; i++ ) {
    var nextRow = row.slice();

    nextRow[ column ] = 1;
    
    solution.push( nextRow );

    column++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; 
  
  var factorial = function (num) {
    if ( num === 1 ) {
      return 1;
    } 
    return num * factorial( num - 1 );
  };
  solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var row = [];
  var columns = 0;
  var majorDiagonals = 0;
  var minorDiagonals = 0;
  var rowCount = 0;

  for ( var i = 0; i !== n; i++ ) {
    row.push( 0 );
  }

  var getSolution = function( solution, rowCount, majorDiagonals, minorDiagonals ) {
    if ( solutions.length === 1 ) {
      return;
    }
    
    if ( n === rowCount ) {
      solutions.push( solution );
    } else {
      for ( var i = 0; i !== n; i++ ) {
        var binaryIndex = Math.pow( 2, i );

        if ( binaryIndex & columns || binaryIndex & majorDiagonals || binaryIndex & minorDiagonals ) {
          continue;
        } else {
          var nextRow = row.slice();
          nextRow[ i ] = 1;
          columns += binaryIndex;
          majorDiagonals += binaryIndex;
          minorDiagonals += binaryIndex;

          getSolution( solution.concat( [ nextRow ] ), rowCount + 1, majorDiagonals << 1, minorDiagonals >> 1 );

          minorDiagonals -= binaryIndex;
          majorDiagonals -= binaryIndex;
          columns -= binaryIndex;
        }
      }
    }
  };

  if ( n === 2 ) {
    solutions = [[ [ 0, 0 ], [ 0, 0 ] ]];
  } else if ( n === 3 ) {
    solutions = [[ [ 0, 0, 0], [ 0, 0, 0], [ 0, 0, 0] ]];
  } else {
    getSolution([], rowCount, 0, 0 );
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[ 0 ]));
  return solutions[ 0 ];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = 0;
  var columns = 0;
  var majorDiagonals = 0;
  var minorDiagonals = 0;
  var rowCount = 0;

  var getSolution = function( rowCount, majorDiagonals, minorDiagonals ) {
    if ( n === rowCount ) {
      solutions++;
    } else {
      for ( var i = 0; i !== n; i++ ) {
        var binaryIndex = Math.pow( 2, i );
        
        if ( rowCount === 0 && i === Math.ceil( n / 2 ) && n % 2 === 0 ) {
          solutions = 2 * solutions;
          
          return;
        }
        
        if ( binaryIndex & columns || binaryIndex & majorDiagonals || binaryIndex & minorDiagonals ) {
          continue;
        } else {
          columns += binaryIndex;
          majorDiagonals += binaryIndex;
          minorDiagonals += binaryIndex;

          getSolution( rowCount + 1, majorDiagonals << 1, minorDiagonals >> 1 );

          minorDiagonals -= binaryIndex;
          majorDiagonals -= binaryIndex;
          columns -= binaryIndex;
        }
      }
    }
  };
  
  if ( n === 0 ) {
    return 1;
  }
  if ( n === 2 ) {
    return 0;
  } else if ( n === 3 ) {
    return 0;
  } else {
    getSolution( rowCount, 0, 0 );
  }

  console.log('Number of solution for ' + n + ' queens:', JSON.stringify(solutions));
  return solutions;
};