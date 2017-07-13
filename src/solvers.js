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
  var columns = [];
  var majorDiagonals = [];
  var minorDiagonals = [];
  var rowCount = 0;

  for ( var i = 0; i !== n; i++ ) {
    row.push( 0 );
  }

  var getSolution = function( solution, rowCount ) {
    if ( n === rowCount ) {
      solutions.push( solution );
    } else {
      for ( var i = 0; i !== n; i++ ) {
        if ( columns[ i ] || majorDiagonals[ i ] || minorDiagonals[ i ] ) {
          continue;
        } else {
          var nextRow = row.slice();
          nextRow[ i ] = 1;
          columns[ i ] = 1;
          majorDiagonals[ i ] = 1;
          minorDiagonals[ i ] = 1;
          majorDiagonals.unshift( 0 );
          var copy = minorDiagonals.shift();

          getSolution( solution.concat( [ nextRow ] ), rowCount + 1);

          minorDiagonals.unshift( copy );
          majorDiagonals.shift();
          minorDiagonals[ i ] = 0;
          majorDiagonals[ i ] = 0;
          columns[ i ] = 0;
        }
      }
    }
  };

  if ( n === 2 ) {
    solutions = [[ [ 0, 0 ], [ 0, 0 ] ]];
  } else if ( n === 3 ) {
    solutions = [[ [ 0, 0, 0], [ 0, 0, 0], [ 0, 0, 0] ]];
  } else {
    getSolution([], rowCount);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[ 0 ]));
  return solutions[ 0 ];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = [];
  var row = [];
  var columns = [];
  var majorDiagonals = [];
  var minorDiagonals = [];
  var rowCount = 0;

  for ( var i = 0; i !== n; i++ ) {
    row.push( 0 );
  }

  var getSolution = function( solution, rowCount ) {
    if ( n === rowCount ) {
      solutionCount.push( solution );
    } else {
      for ( var i = 0; i !== n; i++ ) {
        if ( columns[ i ] || majorDiagonals[ i ] || minorDiagonals[ i ] ) {
          continue;
        } else {
          var nextRow = row.slice();
          nextRow[ i ] = 1;
          columns[ i ] = 1;
          majorDiagonals[ i ] = 1;
          minorDiagonals[ i ] = 1;
          majorDiagonals.unshift( 0 );
          var copy = minorDiagonals.shift();

          getSolution( solution.concat( [ nextRow ] ), rowCount + 1);

          minorDiagonals.unshift( copy );
          majorDiagonals.shift();
          minorDiagonals[ i ] = 0;
          majorDiagonals[ i ] = 0;
          columns[ i ] = 0;
        }
      }
    }
  };

  if ( n === 2 ) {
    return 0;
  } else if ( n === 3 ) {
    return 0;
  } else {
    getSolution([], rowCount);
  }

  console.log('Number of solutions for ' + n + ' queens:', JSON.stringify(solutionCount.length));
  return solutionCount.length;
};
