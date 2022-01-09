'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements=function(movement,sort=false){
  containerMovements.innerHTML='';

  const movs=(sort)?movements.slice().sort((a,b)=>a-b):movements;

  movs.forEach(function(mov,i){

    const type=(mov>0)?'deposit':'withdrawal';

    const html=`
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}€</div>
  </div>`
  containerMovements.insertAdjacentHTML('afterbegin',html);

  });
}


// 
const calcDisplayBalance=function(account){
  account.balance= account.movements.reduce(function(acc,mov){
    return acc+mov
  },0);
  
  labelBalance.textContent=`${account.balance} EUR`;
}

//
const calcDisplaySummary=function(acc){
  const income=acc.movements
        .filter(mov=>mov>0)
        .reduce((acc,mov)=>mov+acc);
labelSumIn.textContent=`${income}€`;

  const out=acc.movements
      .filter(mov=>mov<0)
      .reduce((acc,mov)=>mov+acc);
labelSumOut.textContent=`${Math.abs(out)}€`;

const interset=acc.movements
      .filter(mov=>mov>0)
      .map
      (deposit=>deposit*acc.interestRate/100)
      .filter(int=>int>=1)
      .reduce((acc,int)=>acc+int,0);
labelSumInterest.textContent=`${interset}€`;
}


//
const createUsernames=function(acs){
acs.forEach(function(acc){

 acc.username= acc.owner
  .toLocaleLowerCase()
  .split(' ')
  .map(word=>word[0])
  .join('');
}) 
  
};

createUsernames(accounts)

const updateUI=function (acc) {
   // display movements
   displayMovements(acc.movements);
   // displaty balance 
   calcDisplayBalance(acc);
   // display summery
   calcDisplaySummary(acc);
}



// EVENT Listners
let currentAccount;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  console.log(`clicked  `);

currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
console.log(currentAccount);

if(currentAccount?.pin===Number(inputLoginPin.value)){
  console.log(`Login`);
  // diplay UI and massage
  labelWelcome.textContent=`Welcome  ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity=1;
  // clear Inputfield
  inputLoginUsername.value=inputLoginPin.value='';
  inputLoginPin.blur();
  
  updateUI(currentAccount);
 
}
})


// console.log(accounts);
// 
btnTransfer.addEventListener('click',function(e){
  e.preventDefault()
 const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts
  .find(acc=>acc.username===inputTransferTo.value);

  // clean input fields
  inputTransferAmount.value=inputTransferTo.value='';
  
  
  if(amount>0 && 
    receiverAcc&&
    amount<=currentAccount.balance &&
    receiverAcc.username !== currentAccount.username)
{
  // Doing the transfer
    
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);  

  // update UI
    updateUI(currentAccount);
}
});
//
btnLoan.addEventListener('click',function(e) {
  e.preventDefault();
  const amount=Number(inputLoanAmount.value);

  if(0<amount && currentAccount.movements.some(mov=>mov>=amount*0.1)){
    // Add movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value='';
})

//
btnClose.addEventListener('click',function (e) {
  e.preventDefault();
  

  if(inputCloseUsername.value===currentAccount.username 
    && Number(inputClosePin.value)===currentAccount.pin){
   console.log(`delete`);
   const index=accounts.findIndex
      (acc=>acc.username===inputCloseUsername.value)
      console.log(index);
   
   // delete account 
   accounts.splice(index,1);   
  // log out 
  containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value='';
});
//
let sorted=false;
btnSort.addEventListener('click',function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// LECTURES

// const arr=['a','b','c','d','e'];

// console.log(arr.slice());
// console.log(arr.slice(1));
// console.log(arr.slice(2));
// console.log(arr.slice(1,-1));


// console.log('avishka'.slice(-1));

// // console.log([...arr]);
// // console.log(arr.splice(-3));
// console.log(arr);


// // console.log([...arr]);
// // console.log(arr.splice(0,));
// // console.log(arr);

// const arr2=['e','r','a','c','z'];
// console.log(arr2);
// console.log(arr2.reverse());

// console.log(arr2);


// const letters=arr.concat(arr2);
// console.log(letters);
// console.log([...arr,...arr2]);

// console.log(arr2.join('#'));

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// for (const movement of movements){
//   (movement>0)?console.log(`you deposited ${movement}`):console
//   .log(`you withdraws ${Math.abs(movement)}`);
// }

// console.log(`-------`);

// movements.forEach(function(movement,i,arr){
//   (movement>0)?console.log(`you deposited ${i}:${movement} `):console
//   .log(`you withdraws ${i}:${Math.abs(movement)}`);

// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value,key,map){
//   console.log(`${key} :${value} ${map}`);
// });


// const currenciesUnique = new Set([
//     'USD',
//     'EUR',
//     'GBP',
//     'USD',
//     'USD',
//     'EUR',
//     'GBP',
// ]);

// console.log(currenciesUnique);


// currenciesUnique.forEach(function(value,_,set){
//   console.log(`${_} : ${value}`);
// });






// console.log(currencies);

// currencies.forEach(function(value,key){
//   console.log(value);
// });



// console.log(movements);

// const arr=movements.map(function(mov){
//   return mov*2;
   
// });

// console.log(arr);

// const arr=movements.map((mov)=>mov*2);


// let arr2=[];

// movements.forEach(function(mov,i){
//   // console.log(mov);
//   arr2.push(mov*2);
// });
// console.log(arr2);

// for (const movement of movements) {
//   for (const [i, movement] of movements.entries()) {
//     if (movement > 0) {
//       console.log(`Movement ${i + 1}: You deposited ${movement}`);
//     } else {
//       console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//     }
//   }
// }



//  const description= movements.map(function(movement,i,arr){
  
//     if (movement > 0) {
//       return (`Movement ${i + 1}: You deposited ${movement}`);
//     } else {
//       return (`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//     }
//   });


// console.log(movements);

// const filtered= movements.filter(function(mov){
//  return mov>0});

// console.log(filtered);


// const withdrawls=movements.filter(mov=>mov<0);
// console.log(withdrawls);


// movements.filter(function(mov,i,arr){
//   console.log(arr);
//   return mov>0});

// const balance=movements.reduce(function(acc,cur,i,arr){
//   console.log(`${i} : ${acc}`);
//   return acc+cur;
// },0);

// console.log(balance);

// const balance=movements.reduce((acc,cur,i,arr)=>acc+cur,0);

// console.log(balance);



// let balance2=0;

// for(const mov of movements){
//   balance2=balance2+mov;
// }
// console.log(balance2);
// const currencies = {
//   'USD':'United States dollar',
//   'USDq':'United States dollar1',
//   'UwSD':'United States dollar2',
// };


// const Maximum=movements.reduce(function(acc,cur){
  //   return (acc>cur)?acc:cur;
  // },movements[0]);
  
  // console.log(Maximum);
  
  // const Maximum=movements.reduce((acc,cur)=>(acc>cur)?acc:cur,movements[0]);
  
  // console.log(Maximum);
  
  const movements =  [200, 450, -400, 3000, -650, -130, 70, 1300];
  const eurToUsd=1.1;

// const totalDepositsUSD=movements
//     .filter(mov=>0<mov)
//     .map(mov=>mov*eurToUsd)
//     .reduce((acc,mov)=>acc+mov);



// console.log(totalDepositsUSD);
// console.log(movements);
// const firstWithdrawal=movements.find(mov=>mov<0);

// console.log(firstWithdrawal);

// console.log(accounts);
// const account=accounts.find((acc,i)=>{
//   // console.log(i);
//   return acc.owner==='Sarh Smith'});

// console.log(account);

//
// let accountD3;

// for (const i of accounts){
//   // console.log(i);
//   if(i.owner==='Jessica Davis') accountD3=i;
// }

// console.log(accountD3);


// console.log(movements.includes());

// console.log(movements.some(mov=>450==mov));

// const arr=[1,[5,[6,7,[4,[4,8]]]],2,[5,6],3,4,5,6];

// console.log(arr);
// console.log(arr.flat(4));
// const x=[...arr]
// console.log(x);
// console.log([...x]);

// const movem=accounts.map(acc=>acc.movements)
//                   .flat()
//                   .reduce((acc,mov)=>mov+acc);

// console.log(movem);

// const movem2=accounts.flatMap(acc=>acc.movements)
//                   .reduce((acc,mov)=>mov+acc);

// console.log(movem2);




// const names=['nimal','aaaaa','aanith','aa',];
// console.log(names.sort());

// console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// return -1, A come first
// return 1  b come first

// movements.sort((a,b)=>{

// return a-b;


// });

// console.log(movements);

// const x=[200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(x);

// // x.sort((a,b)=>a-b);
// x.sort((a,b)=>b-a); 

// console.log(x);

// const x=new Array(7);
// console.log(x);

// x.fill(5,2,50);
// console.log(x);

// const y=[1,2,3,4,5,6,7,8];
// console.log(y);

// y.fill(1,2,5);
// console.log(y);
// //

// const from=Array.from({length:7},(_,i)=>i+1);
// console.log(from);


// const from2=Array.from({length:100},(cur,i)=>i);
// console.log(from2);

// const obj={
//   fname:'ks',
//   age:16,
//   village:'matara',
// }
// // console.log(obj);
// const objArr=Array.from(obj); 

// console.log([objArr]);

// const dom=document.querySelectorAll('*');
// const domArr=Array.from(dom);
// // console.log(dom);
// // console.log(domArr);

// const str='avishka'

// const strArray=Array.from(str);
// console.log(strArray);
// console.log(typeof(strArray));

// const set=new Set([1,2,3,4,4,4]);
// console.log(typeof(set));
// console.log(typeof(Array.from(set)));

// console.log(set);


// const obj={
//   fname:'ks',
//   age:'fort',
//   village:'matara',
// }
// const fname='avishka';
// console.log(...[obj]);

// const objFrom2=Array.from(obj,function (char) {
//   return char.toUpperCase();
// })
// const x=Array.from(obj);

// console.log(x);


// const objFrom=Array.from(fname,function (char) {
//   return char.toUpperCase();
// })

// console.log(objFrom);



// const obj3={
//   fname:'ks',
//   age:16,
//   village:'matara',
// }
// console.log(obj3);
// const obj3Arr=Array.from(obj3); 

