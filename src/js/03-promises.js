import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = Number(form.elements['delay'].value);
  const stepInput = Number(form.elements['step'].value);
  const amountInput = Number(form.elements['amount'].value);

  let currentDelay = delayInput;

  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, currentDelay)
      .then((result) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      })
      .catch((error) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      });

    const nextDelay = currentDelay + stepInput;
    setTimeout(() => {}, nextDelay);
    currentDelay = nextDelay;
  }
});