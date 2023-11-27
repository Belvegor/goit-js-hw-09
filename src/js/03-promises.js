import Notiflix from 'notiflix';

// tworzy obietnicę
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Obsługa formularza
const form = document.querySelector('.form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const delayInput = Number(form.elements['delay'].value);
  const stepInput = Number(form.elements['step'].value);
  const amountInput = Number(form.elements['amount'].value);

  let currentDelay = delayInput;

  for (let i = 1; i <= amountInput; i++) {
    try {
      const result = await createPromise(i, currentDelay);
      Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }

    currentDelay += stepInput;
  }
});