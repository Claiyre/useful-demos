
//ES6中的Promise是一个构造函数用来生来Promise对象，所以这里我们也先声明一个构造函数，用来模仿Promise
function MyPromise(fn){ 
  //表征MyPromise对象的状态：pending，resolve，reject 
  this.status = "pending";
  this.resolveFunc = function(){};
  this.rejectFunc = function(){};
  //生命Promise对象时传入的函数会被立即执行，这里需要用bind改变resolve和reject函数执行时的this指向，返回一个新函数，其this指向当前Promise实例
  fn(this.resolve.bind(this),this.reject.bind(this));
}


//在MyPromise的原型对象上定义resolve，reject函数，可以让所以实例共享，也就是定义好Promise参数（是一个函数）的参数：resolve，reject
MyPromise.prototype.resolve = function(res){
  var self = this;
  if(this.status === "pending") {
    //成功，从pending状态变为resolve
    this.status = "resolve";
    //在fn内部执行到resolve/reject时，还没有开始执行then方法，所以此时resolve/reject还没有被开发者传入
    //用setTimeout将resolve延迟执行，放到事件队列后，也就是当then执行后才执行resolve或reject
    setTimeout(function(){
      self.resolveFunc(res);
    },0);
  }
  
}
MyPromise.prototype.reject = function(res){
  var self = this;
  if(this.status === "pending"){
    this.status = "reject";
    setTimeout(function(){
      self.rejectFunc(res);
    },0);
  }
}
//then也定义在原型上，执行到then方法时，给实例对象的resolveFunc和rejectFunc赋值
MyPromise.prototype.then = function(resolveFunc,rejectFunc){
  this.resolveFunc = resolveFunc;
  this.rejectFunc = rejectFunc;
}

//可以发现resolveFunc和rejectFunc才是真正的resolve和reject



//以下是试用的实例

var fn = function (resolve,reject){
  console.log('begin to execute!');
  var number = Math.random();
  if(number <=0.5){
    resolve("less than 0.5");
  } else {
    reject("greater than 0.5");
  }
};

var p = new MyPromise(fn);

p.then(function(res){
  console.log("resolve "+res);
},function(res){
  console.log("reject "+res);
});