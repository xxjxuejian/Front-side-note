### this 关键字

首先要明确的几点：

1. 函数中才有 `this`,this 始终指向的是一个对象
2. 函数本身不属于任何一个对象，可以在不同的环境（上下文）中执行，所以想要知道 this 的指向，就要知道是谁来调用这个函数的。

### 确定 this 的指向

要确定 this 的指向问题，就看这个函数是如何被调用的  
掌握一个原则：函数不属于任何一个对象，变量保存的都是函数的地址，函数 this 指向谁，看这个函数是怎么被调用的。所以函数中的 this 指向是动态的。

### this 的绑定规则

1. 默认绑定:  
    在全局环境中，直接调用一个函数的时候，this 指向的就是 window 对象

   ```javascript
   function f() {
     console.log(this.a);
   }

   var a = 2;
   f(); // 输出：2
   ```

   使用 var 关键字声明变量的时候，默认是给 window 对象添加了一个属性 a,
   函数 f 在全局环境中被直接调用，调用方式是`f()`,这时候函数中的 this 指向的就是 window

2. 隐式绑定:  
    通过某一个对象来调用函数时，函数中的 this 指向的是这个对象

   ```javascript
   function f() {
     console.log(this.a);
   }

   var obj = {
     a: 3,
     f: f,
   };

   var a = 2;

   obj.f(); // 输出：3
   ```

   函数 f 调用方式为`obj.f()`,虽然函数是定义在全局中的，并不意味着 f 属于全局对象 window，但是它被当做引用（reference）添加到 obj 中，当执行 obj.f()是，this 隐式的指向了 obj 对象

   修改一下这个例子：

   ```javascript
   var obj = {
     a: 3,
     f: function () {
       console.log(this.a);
     },
   };

   //变量f通过obj.f获取了函数的地址，但是并不意味this就指向了obj
   var f = obj.f;
   var a = 2;
   f(); // 输出：2
   ```

   还是那个原则，函数不属于任何一个对象，虽然 f 通过 obj.f 获取到了函数的地址，但是函数内部 this 指向和 obj 没有任何关系，仅仅是 f 和 obj.f 指向的地址相同，这个函数如何调用还不知道呢  
   由于`f()`直接调用，this 指向的就是全局，属于默认绑定类型

3. 显示绑定:  
    可通过 `call()`、`apply()`、`bing()`函数显示的绑定 this 的值

   call,和 apply 属于一次性绑定，函数调用 call 或者 apply 的时候，函数会执行，this 被绑定到执行的对象上，但是只是这一次被绑定了

   ```javascript
   function f() {
     console.log(this.a);
   }

   var obj = {
     a: 2,
   };

   //函数通过call方法，指定this的指向，此时函数f会执行，
   //this指向的是obj
   f.call(obj); // 输出：2

   //再次调用f
   f(); //输出undefined。this指向的是window
   ```

   call 和 apply 的区别在于，参数传递方式不同

   bind()是永久的绑定，同时返回一个新的函数，这个函数的 this 是被绑定到指定对象的，调用 bind 不会执行函数

   ```javascript
   const module = {
     x: 42,
     getX: function () {
       return this.x;
     },
   };

   //unboundGetX和module.getX指向同一个函数的地址
   const unboundGetX = module.getX;

   //函数直接调用，this执行window
   console.log(unboundGetX()); // undefined

   //使用bind绑定到module对象，此时函数没有执行，返回一个新的this绑定到module的函数
   const boundGetX = unboundGetX.bind(module);
   console.log(boundGetX()); // 42

   //boundGetX()函数的this现在始终是指向module的
   console.log(boundGetX()); // 42
   ```

4. new 绑定：
   当一个函数作为构造函数来使用的时候，即通过 new 创建对象时，构造函数的 this 指向的是梳理

5. 箭头函数：  
   箭头函数是一个例外，箭头函数中没有自己的 this,当然可以在箭头函数中使用 this，但是箭头函数的 this 取决于外层作用域中的 this 的指向。箭头函数用的是别人的 this
