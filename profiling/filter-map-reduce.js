
var n = 1000000;
var a = new Array(n);
for(var i = 0; i< a.length; ++i) {
  a[i] = i;
}

function add1(x) {
  return x + 1;
}

function even(x) {
  return x % 2 === 0;
}

function sum(x, y) {
  return x + y;
}

function noop() {}

for (i = 0; i < 10; i++) {
  streamjs.Observable.from(a).filter(even).map(add1).reduce(sum, 0)
    .subscribe({
      next: noop,
      completed: () => { console.log('completed ' + i)},
      error: function(e) {
        console.error(e);
      }
    });
}
